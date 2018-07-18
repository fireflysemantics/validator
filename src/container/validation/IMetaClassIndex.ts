import { MetaClass } from "@fs/container/validation/MetaClass";

export interface IMetaClassIndex {
    [validationContextKey: string]: MetaClass;
}

