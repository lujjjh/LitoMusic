import { ResourceList } from '../components'

export interface RecommendationProps {
  value: PersonalRecommendation
}

export interface PersonalRecommendation {
  id: string
  type: string
  href: string
  title: { stringForDisplay: string }
  contents: any[]
}

const Recommendation = ({ value }: RecommendationProps) => (
  <ResourceList title={value.title?.stringForDisplay} resources={value.contents} />
)

export default Recommendation
