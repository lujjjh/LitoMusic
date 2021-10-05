import { ResourceList } from '../components'

export interface EditorialElementProps {
  value: EditorialElement
}

export interface EditorialElement {
  name?: string
  contents: any[]
}

const EditorialElement = ({ value }: EditorialElementProps) => {
  return <ResourceList title={value.name} resources={value.contents} />
}

export default EditorialElement
