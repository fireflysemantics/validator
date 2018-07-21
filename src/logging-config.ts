import {Category, CategoryServiceFactory,CategoryConfiguration,LogLevel} from "typescript-logging";
 
// Optionally change default settings, in this example set default logging to Info.
// Without changing configuration, categories will log to Error.
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));
export const ValidateLogger = new Category("validate"); 