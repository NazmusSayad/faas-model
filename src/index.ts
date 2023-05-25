import mongoose, {
  CompileModelOptions,
  HydratedDocument,
  InferSchemaType,
  ObtainSchemaGeneric,
} from 'mongoose'

type ModelGenerator<TSchema extends mongoose.Schema> = mongoose.Model<
  InferSchemaType<TSchema>,
  ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>,
  ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
  ObtainSchemaGeneric<TSchema, 'TVirtuals'>,
  HydratedDocument<
    InferSchemaType<TSchema>,
    ObtainSchemaGeneric<TSchema, 'TVirtuals'> &
      ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
    ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>
  >,
  TSchema
> &
  ObtainSchemaGeneric<TSchema, 'TStaticMethods'>

export default function <TSchema extends mongoose.Schema>(
  name: string,
  schema: TSchema,
  collection?: string,
  options?: CompileModelOptions
) {
  const model =
    mongoose.models[name] ?? mongoose.model(name, schema, collection, options)
  return model as ModelGenerator<TSchema>
}
