import type {
  FC,
  MouseEventHandler,
} from 'react'
import {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import type {
  OffsetOptions,
  Placement,
} from '@floating-ui/react'
import type {
  BlockEnum,
  NodeDefault,
  OnSelectBlock,
  ToolWithProvider,
} from '../types'
import Tabs from './tabs'
import { TabsEnum } from './types'
import { useTabs } from './hooks'
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '@/app/components/base/portal-to-follow-elem'
import Input from '@/app/components/base/input'
import cn from '@/utils/classnames'
import {
  Plus02,
} from '@/app/components/base/icons/src/vender/line/general'
import ToolSearchInputTag from './tool-search-input-tag'

export type NodeSelectorProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onSelect: OnSelectBlock
  trigger?: (open: boolean) => React.ReactNode
  placement?: Placement
  offset?: OffsetOptions
  triggerStyle?: React.CSSProperties
  triggerClassName?: (open: boolean) => string
  triggerInnerClassName?: string
  popupClassName?: string
  asChild?: boolean
  availableBlocksTypes?: BlockEnum[]
  disabled?: boolean
  blocks?: NodeDefault[]
  dataSources?: ToolWithProvider[]
}
const NodeSelector: FC<NodeSelectorProps> = ({
  open: openFromProps,
  onOpenChange,
  onSelect,
  trigger,
  placement = 'right',
  offset = 6,
  triggerClassName,
  triggerInnerClassName,
  triggerStyle,
  popupClassName,
  asChild,
  availableBlocksTypes,
  disabled,
  blocks = [],
  dataSources = [],
}) => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [localOpen, setLocalOpen] = useState(false)
  const open = openFromProps === undefined ? localOpen : openFromProps
  const handleOpenChange = useCallback((newOpen: boolean) => {
    setLocalOpen(newOpen)

    if (!newOpen)
      setSearchText('')

    if (onOpenChange)
      onOpenChange(newOpen)
  }, [onOpenChange])
  const handleTrigger = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    if (disabled)
      return
    e.stopPropagation()
    handleOpenChange(!open)
  }, [handleOpenChange, open, disabled])
  const handleSelect = useCallback<OnSelectBlock>((type, toolDefaultValue) => {
    handleOpenChange(false)
    onSelect(type, toolDefaultValue)
  }, [handleOpenChange, onSelect])

  const {
    activeTab,
    setActiveTab,
    tabs,
  } = useTabs(!blocks.length, !dataSources.length)

  const searchPlaceholder = useMemo(() => {
    if (activeTab === TabsEnum.Blocks)
      return t('workflow.tabs.searchBlock')

    if (activeTab === TabsEnum.Tools)
      return t('workflow.tabs.searchTool')

    if (activeTab === TabsEnum.Sources)
      return t('workflow.tabs.searchDataSource')
    return ''
  }, [activeTab, t])

  return (
    <PortalToFollowElem
      placement={placement}
      offset={offset}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <PortalToFollowElemTrigger
        asChild={asChild}
        onClick={handleTrigger}
        className={triggerInnerClassName}
      >
        {
          trigger
            ? trigger(open)
            : (
              <div
                className={`
                  z-10 flex h-4 
                  w-4 cursor-pointer items-center justify-center rounded-full bg-components-button-primary-bg text-text-primary-on-surface hover:bg-components-button-primary-bg-hover
                  ${triggerClassName?.(open)}
                `}
                style={triggerStyle}
              >
                <Plus02 className='h-2.5 w-2.5' />
              </div>
            )
        }
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent className='z-[1000]'>
      <div className={cn(
          'overflow-hidden rounded-xl border-[0.5px] border-components-panel-border bg-components-panel-bg shadow-lg backdrop-blur-[5px]',
          popupClassName,
        )}>
          <div className='border-b border-divider-subtle bg-background-section-burn'>
            <div className='flex h-9 items-center px-1 pt-1'>
              {
                tabs.map(tab => (
                  <div
                    key={tab.key}
                    className={cn(
                      'system-sm-medium mr-0.5 cursor-pointer rounded-t-lg px-3 py-2 text-text-tertiary hover:bg-state-base-hover',
                      activeTab === tab.key && 'bg-components-panel-bg text-text-accent shadow-sm',
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveTab(tab.key)
                    }}
                  >
                    {tab.name}
                  </div>
                ))
              }
            </div>
            <div className='relative z-[1] bg-components-panel-bg p-2'>
              <div className='flex items-center rounded-lg' onClick={e => e.stopPropagation()}>
                <Input
                  wrapperClassName='flex items-center'
                  showLeftIcon
                  showClearIcon
                  autoFocus
                  value={searchText}
                  placeholder={searchPlaceholder}
                  onChange={e => setSearchText(e.target.value)}
                  onClear={() => setSearchText('')}
                />
                {
                  activeTab === TabsEnum.Tools && (
                    <>
                      <div className='mr-0.5 h-3.5 w-[1px] bg-divider-regular'></div>
                      <ToolSearchInputTag
                        tags={tags}
                        onTagsChange={setTags}
                      />
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <Tabs
            activeTab={activeTab}
            onSelect={handleSelect}
            searchText={searchText}
            tags={tags}
            availableBlocksTypes={availableBlocksTypes}
            blocks={blocks}
            dataSources={dataSources}
          />
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  )
}

export default memo(NodeSelector)
