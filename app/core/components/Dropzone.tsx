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
    <Box bg="gray.800">
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Kliknij tutaj lub przeciągnij ręcznie zdjęcie aby je dodać!</p>
        </div>
        {acceptedFiles.length > 0 && (
          <div>
            <h4>Accepted files</h4>
            <ul>
              {acceptedFiles.map((file) => (
                <Box boxSize="sm" key={file.name}>
                  <Image src={URL.createObjectURL(file)} />
                </Box>
              ))}
            </ul>
          </div>
        )}
        <LabeledTextField name={name} label="" style={{ display: "none" }} value={uplodadedUrl} />
        <Button
          bg="gray.600"
          onClick={async () => {
            if (!acceptedFiles[0]) return
            const { data } = await supabase.storage
              .from("car-photos")
              .upload("image.jpg", acceptedFiles[0])
            if (data?.path) setUploadedUrl(data?.path)
          }}
        >
          Zatwierdź
        </Button>
      </section>
    </Box>
  )
})
