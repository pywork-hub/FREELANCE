import { Injectable } from '@nestjs/common'
import {
	createWriteStream,
	ensureDir,
	readdir,
	readdirSync,
	remove,
	statSync,
} from 'fs-extra'
import { extname, join } from 'path'
import { pipeline } from 'stream/promises'
import { FolderWithChild } from './entities/folder.entity'
import { CreateFolderInput } from './inputs/create-folder.input'
import { UploadFilesInput } from './inputs/upload-files.input'

@Injectable()
export class StorageService {
	async getDirectories(directoryPath: string) {
		try {
			const staticPath = `${process.env.CDN_EDGE_PREFIX}/${directoryPath}`
			const folders: FolderWithChild[] = []
			const items = await readdir(staticPath)

			for (const item of items) {
				const itemPath = join(staticPath, item)
				const stats = statSync(itemPath)
				const isDirectory = stats.isDirectory()

				if (isDirectory) {
					const folder: FolderWithChild = {
						name: item,
						childrens: await this.getDirectories(itemPath),
						path: itemPath,
						createdAt: stats.birthtime,
					}
					folders.push(folder)
				}
			}

			return folders
		} catch (error) {
			throw error
		}
	}

	async getFolderItems(parentPath: string) {
		try {
			const staticPath = `${process.env.CDN_EDGE_PREFIX}/${parentPath}`
			const items = readdirSync(staticPath, {
				withFileTypes: true,
			})

			const files = []
			const folders = []

			for (const item of items) {
				const fullPath = `${staticPath}/${item.name}`
				const stats = statSync(fullPath)

				if (item.isDirectory()) {
					const folderSize = await this.getFolderSize(fullPath)
					folders.push({
						name: item.name,
						size: this.formatBytes(folderSize),
						count: this.countItemsInFolder(fullPath),
						path: `${parentPath}/${item.name}`,
						createdAt: stats.birthtime,
					})
				} else {
					files.push({
						name: item.name,
						size: this.formatBytes(stats.size),
						extension: extname(item.name),
						path: `${parentPath}/${item.name}`,
						createdAt: stats.birthtime,
					})
				}
			}

			return { folders, files }
		} catch (error) {
			return { files: [], folders: [] }
		}
	}

	async uploadFiles({ data, folderPath }: UploadFilesInput) {
		try {
			const uploadFolder = `${process.env.CDN_EDGE_PREFIX}/${folderPath}`

			for await (const file of data) {
				const { createReadStream, filename } = file
				const readStream = createReadStream()

				await pipeline(
					readStream,
					createWriteStream(`${uploadFolder}/${filename}`)
				)
			}

			return 'Файлы успешно загружены'
		} catch (error) {
			return `Ошибка во время загрузки файлов: ${error}`
		}
	}

	async createFolder({ name, folderPath }: CreateFolderInput) {
		const createFolderPath = `${process.env.CDN_EDGE_PREFIX}/${folderPath}/${name}`

		try {
			await ensureDir(createFolderPath)
			return 'Успешно'
		} catch (error) {
			return 'Ошибка'
		}
	}

	async deleteFileOrFolder(currentPath: string) {
		try {
			await remove(`${process.env.CDN_EDGE_PREFIX}/${currentPath}`)

			return `Успешно`
		} catch (error) {
			return `Ошибка`
		}
	}

	private async getFolderSize(folderPath: string) {
		const items = readdirSync(folderPath, { withFileTypes: true })
		let totalSize = 0

		for (const item of items) {
			const fullPath = `${folderPath}/${item.name}`
			const stats = statSync(fullPath)

			totalSize += item.isDirectory()
				? await this.getFolderSize(fullPath)
				: stats.size
		}

		return totalSize
	}

	private formatBytes(bytes: number) {
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB']

		if (bytes === 0) return '0 B'

		const i = Math.floor(Math.log(bytes) / Math.log(1024))

		return (
			(Math.round((100 * bytes) / Math.pow(1024, i)) / 100).toFixed(2) +
			' ' +
			sizes[i]
		)
	}

	private countItemsInFolder(folderPath: string) {
		const items = readdirSync(folderPath, { withFileTypes: true })
		return items.length
	}
}
