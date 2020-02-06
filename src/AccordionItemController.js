import config from './SharedConfig';
export class AccordionItemController {

    constructor(config) {
        this.open_items = [];

        this.current_id = 1;

        this.initially_open = null;
        this.config = config;
    }

    setInitiallyOpen(initially_open) {
        this.initially_open = initially_open;
        if (typeof initially_open === 'string' || typeof initially_open === 'number') {
            this._addItem(initially_open.toString());
        } else if (Array.isArray(initially_open)) {
            initially_open.forEach(id => {
                this._addItem(id.toString());
            });
        }
    }

    getNextId() {
        const v = this.current_id.toString();
        this.current_id += 1;
        return v;
    }

    isOpen(id) {
        return this.open_items.includes(id);
    }

    setOpen(id, should_be_open) {
        if (should_be_open) {
            this._addItem(id);
        } else {
            this._removeItem(id);
        }
    }

    toggleOpen(id) {
        if (this.open_items.includes(id)) {
            this._removeItem(id);
        } else {
            this._addItem(id);
        }
    }

    register() {
        const id = this.getNextId();
        return id;
    };

    _removeItem(id) {
        const idx = this.open_items.findIndex(i => i === id);
        if (idx !== -1) {
            this.open_items.splice(idx, 1);
        }
    }

    _addItem(id) {
        if (this.config.dropdown) {
            this.open_items.push(id);
        } else {
            this.open_items = [id];
        }
    }

}