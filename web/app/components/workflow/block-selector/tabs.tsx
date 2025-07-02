import type { FC } from 'react'
import { memo } from 'react'
import { useAllBuiltInTools, useAllCustomTools, useAllWorkflowTools } from '@/service/use-tools'
import type {
  BlockEnum,
  NodeDefault,
  OnSelectBlock,
  ToolWithProvider,
} from '../types'
import { TabsEnum } from './types'
import Blocks from './blocks'
import AllTools from './all-tools'
import DataSources from './data-sources'

export type TabsProps = {
  activeTab: TabsEnum
  searchText: string
  tags: string[]
  onSelect: OnSelectBlock
  availableBlocksTypes?: BlockEnum[]
  blocks: NodeDefault[]
  dataSources?: ToolWithProvider[]
}
const Tabs: FC<TabsProps> = ({
  activeTab,
  tags,
  searchText,
  onSelect,
  availableBlocksTypes,
  blocks,
  dataSources = [],
}) => {
  const { data: buildInTools } = useAllBuiltInTools()
  const { data: customTools } = useAllCustomTools()
  const { data: workflowTools } = useAllWorkflowTools()

  return (
    <div onClick={e => e.stopPropagation()}>
      {
        activeTab === TabsEnum.Blocks && !!blocks.length && (
          <Blocks
            searchText={searchText}
            onSelect={onSelect}
            availableBlocksTypes={availableBlocksTypes}
            blocks={blocks}
          />
        )
      }
      {
        activeTab === TabsEnum.Sources && !!dataSources.length && (
          <DataSources
            searchText={searchText}
            onSelect={onSelect}
            dataSources={dataSources}
          />
        )
      }
      {
        activeTab === TabsEnum.Tools && (
          <AllTools
            className='w-[315px]'
            searchText={searchText}
            onSelect={onSelect}
            tags={tags}
            buildInTools={buildInTools || []}
            customTools={customTools || []}
            workflowTools={workflowTools || []}
          />
        )
      }
    </div>
  )
}

export default memo(Tabs)
