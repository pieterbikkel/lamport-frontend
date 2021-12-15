class DropwdownOption {
    id: number = 0;
    name: string = "";
    link: string = "";

    constructor(dropwdownOption?: DropwdownOption) {
        Object.assign(this, dropwdownOption);
    }
}

export default DropwdownOption;
