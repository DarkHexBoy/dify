import { useCallback, useMemo, useState } from 'react'
import Tab from './tab'
import BuiltInPipelineList from './built-in-pipeline-list'
import CustomizedList from './customized-list'
import { useTranslation } from 'react-i18next'

const List = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('built-in')

  const options = useMemo(() => {
    return [
      { value: 'built-in', label: t('datasetPipeline.tabs.builtInPipeline') },
      { value: 'customized', label: t('datasetPipeline.tabs.customized') },
    ]
  }, [t])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  return (
    <div className='flex grow flex-col'>
      <Tab
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        options={options}
      />
      {
        activeTab === 'built-in' && <BuiltInPipelineList />
      }
      {
        activeTab === 'customized' && <CustomizedList />
      }
    </div>
  )
}

export default List
