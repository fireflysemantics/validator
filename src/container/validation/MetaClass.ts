/**
 * MetaClass stores the property names of the 
 * corresponding decorated class.  These can 
 * then be used to lookup validation contexts 
 * during object validation.
 */
export class MetaClass {
    /**
     * The name of the decorated class.
     */
    public className: string;
    
    /**
     * The properties that were decorated.
     */
    public properties: string[] = [];
    
    constructor(className: string) {
        this.className = className;
    }

    addProperty(property: string) {
        if (!this.properties.includes(property)) {
            this.properties.push(property);
        }
    }
}