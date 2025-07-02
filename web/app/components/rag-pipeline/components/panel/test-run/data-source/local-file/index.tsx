import type { CustomFile as File, FileItem } from '@/models/datasets'
import FileUploader from './file-uploader'

type LocalFileProps = {
  files: FileItem[]
  allowedExtensions: string[]
  updateFileList: (files: FileItem[]) => void
  updateFile: (fileItem: FileItem, progress: number, list: FileItem[]) => void
  onPreview?: (file: File) => void
  notSupportBatchUpload: boolean
}

const LocalFile = ({
  files,
  allowedExtensions,
  updateFileList,
  updateFile,
  onPreview,
  notSupportBatchUpload,
}: LocalFileProps) => {
  return (
    <FileUploader
      fileList={files}
      allowedExtensions={allowedExtensions}
      prepareFileList={updateFileList}
      onFileListUpdate={updateFileList}
      onFileUpdate={updateFile}
      onPreview={onPreview}
      notSupportBatchUpload={notSupportBatchUpload}
    />
  )
}

export default LocalFile
