import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function CarPartForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="type" label="Type" placeholder="Type" />
      <LabeledTextField name="brand" label="Brand" placeholder="Brand" />
      <LabeledTextField name="model" label="Model" placeholder="Model" />
      <LabeledTextField name="fuel" label="Fuel" placeholder="Fuel" />
      <LabeledTextField name="description" label="Description" placeholder="Description" />
      <LabeledTextField name="hp" label="Hp" placeholder="Hp" />
      <LabeledTextField name="engine" label="Engine" placeholder="Engine" />
      <LabeledTextField name="city" label="City" placeholder="City" />
    </Form>
  )
}
