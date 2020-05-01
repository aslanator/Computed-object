export default class Computed {

    constructor(target, handlersObj) {
        this.target = target;
        this.handlersObj = handlersObj;
        this.dependences = {};
        this.insideComputedProperty = false;
        this.savedValues = {};
        this.initProps();
        this.initComputedFunctions();
    }

    initProps() {
        for(let key in this.target){
            let prop = this.target[key];
            let descriptor = {}
            descriptor.get = () => {
                if(this.insideComputedProperty)
                    this.addDependency(this.insideComputedProperty, key);
                return prop;
            };
            descriptor.set = (newValue) => {
                this.resetDependValues(key);
                prop = newValue;
                return newValue;
            };
            Object.defineProperty(this, key, descriptor);
        }
    }

    initComputedFunctions() {
        for(let key in this.handlersObj){
            let handler = this.handlersObj[key];
            let descriptor = {};
            descriptor.get = () => {
                if(typeof this.savedValues[key] !== "undefined")
                    return this.savedValues[key];
                this.setInsideComputed(key);
                let result = handler.call(this);
                this.unsetInsideComputed();
                this.savedValues[key] = result;
                return result;
            };
            Object.defineProperty(this, key, descriptor);
        }
    }

    addDependency(computedKey, key) {
        if(typeof this.dependences[key] === 'undefined')
            this.dependences[key] = new Set([computedKey]);
        else if(!this.dependences[key].has(computedKey))
            this.dependences[key].add(computedKey);
    }

    setInsideComputed(key){
        this.insideComputedProperty = key;
    }

    unsetInsideComputed(){
        this.insideComputedProperty = false;
    }

    resetDependValues(key){
        if(typeof this.dependences[key] !== 'undefined'){
            for(let computedKey of this.dependences[key]){
                if(typeof this.savedValues[computedKey] !== 'undefined')
                    delete this.savedValues[computedKey];
            }
        }
    }
}