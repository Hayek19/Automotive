import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function CarPartForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Nazwa" placeholder="Nazwa" />
      <LabeledTextField name="type" label="Typ" placeholder="Typ" />
      <LabeledTextField name="brand" label="Marka" placeholder="Marka" />
      <LabeledTextField name="model" label="Model" placeholder="Model" />
      <LabeledTextField name="fuel" label="Paliwo" placeholder="Paliwo" />
      <LabeledTextField name="description" label="Opis" placeholder="Opis" />
      <LabeledTextField name="hp" label="Hp" placeholder="Hp" type="number" />
      <LabeledTextField name="engine" label="Silnik" placeholder="Silnik" type="number" />
      <LabeledTextField name="city" label="Miasto" placeholder="Miasto" />
      <input name="image" placeholder="Zdjecie" type="file" />
    </Form>
  )
}
