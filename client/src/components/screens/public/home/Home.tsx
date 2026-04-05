import type { FC } from 'react'
import HomeAbout from './about/HomeAbout'
import HomeAdvantages from './advantages/HomeAdvantages'
import HomeBanner from './banner/HomeBanner'
import HomeCategories from './categories/HomeCategories'
import HomeServices from './services/HomeServices'
import HomeStats from './stats/HomeStats'
import HomeTasks from './tasks/HomeTasks'
import HomeThumbnail from './thumbnail/HomeThumbnail'

const Home: FC = () => {
	return (
		<>
			<HomeThumbnail />
			<HomeCategories />
			<HomeStats />
			<HomeTasks />
			<HomeServices />
			<HomeBanner />
			<HomeAdvantages />
			<HomeAbout />
		</>
	)
}

export default Home
