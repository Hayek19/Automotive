import { Box, Button, InputProps, Image } from "@chakra-ui/react"
import { forwardRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import LabeledTextField from "./LabeledTextField"
import { supabase } from "lib/supabase"

interface Props extends InputProps {
  /** Field name. */
  name: string
}

export const Dropzone = forwardRef<HTMLElement, Props>(({ name }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [uplodadedUrl, setUploadedUrl] = useState("")

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag drop some files here, or click to select files</p>
      </div>
      {acceptedFiles.length > 0 && (
        <div>
          <h4>Accepted files</h4>
          <ul>
            {acceptedFiles.map((file) => (
              <Box boxSize="sm">
                <Image src={URL.createObjectURL(file)} />
                {/* <Image
                  src={supabase.storage.from("car-photos").getPublicUrl(photoUrl).data.publicUrl}
                /> */}
              </Box>
            ))}
          </ul>
        </div>
      )}
      <LabeledTextField name={name} label="" style={{ display: "none" }} value={uplodadedUrl} />
      <Button
        onClick={async () => {
          if (!acceptedFiles[0]) return
          const { data } = await supabase.storage
            .from("car-photos")
            .upload(`avatar.png`, acceptedFiles[0])
          if (data?.path) setUploadedUrl(data?.path)
        }}
      >
        Upload
      </Button>
    </section>
  )
})
