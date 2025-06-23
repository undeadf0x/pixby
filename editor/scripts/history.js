class HistoryItem {
    #validTypes = ["draw"];
    type = "";
    data = {};
    constructor(type, data) {
        // If the type isn't valid, throw an error
        if (!this.#validTypes.includes(type)) {}
    }

    recall() {
        switch (type) {
            case "draw":
            default:
                console.error("Type not implemented for recall!");
        }
    }
}

class Stack {
    limit = 256; // Default value
    stack = [];

    push(data) {
        if (this.stack.length >= this.limit) {
            this.stack.shift();
        }
        this.stack.push(data);
        return this.stack;
    }

    pop() {
        return this.stack.pop();
    }
}