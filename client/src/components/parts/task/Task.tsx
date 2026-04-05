import type { IClassName } from '@/shared/interfaces/class-name/class-name.interface'
import type { ITaskItem } from '@/shared/interfaces/task/task.interface'
import cn from 'clsx'
import type { FC } from 'react'
import styles from './Task.module.scss'

const Task: FC<{ item: ITaskItem } & IClassName> = ({ item, className }) => {
	return (
		<li className={cn(styles.task, className && className)}>
			<div className={styles.circle}>
				<item.icon />
			</div>
			<h3 className={styles.name}>{item.name}</h3>
			<p
				className={styles.description}
				dangerouslySetInnerHTML={{ __html: item.description }}
			/>
		</li>
	)
}

export default Task
