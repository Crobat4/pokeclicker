/// <reference path="../Quest.ts" />

class UseOakItemQuest extends Quest implements QuestInterface {

    private item: OakItemType;

    constructor(amount: number, reward: number, item: OakItemType) {
        super(amount, reward);
        this.item = item;
        this.focus = App.game.statistics.oakItemUses[this.item];
    }

    public static canComplete() {
        return App.game.oakItems.canAccess() && !App.game.challenges.list.disableOakItems.active();
    }

    public static generateData(): any[] {
        const possibleItems = [
            OakItemType.Magic_Ball,
            OakItemType.Amulet_Coin,
            // OakItemType.Poison_Barb,
            OakItemType.Exp_Share,
            // OakItemType.Sprayduck,
            // OakItemType.Shiny_Charm,
            // OakItemType.Blaze_Cassette,
            // OakItemType.Cell_Battery,
            // OakItemType.Squirtbottle,
            // OakItemType.Sprinklotad,
            // OakItemType.Explosive_Charge,
            // OakItemType.Treasure_Scanner,
        ];
        const oakItem = SeededRand.fromArray(possibleItems);
        const amount = SeededRand.intBetween(100, 500);
        const reward = this.calcReward(amount, oakItem);
        return [amount, reward, oakItem];
    }

    private static calcReward(amount: number, item: OakItemType) {
        const reward = amount * GameConstants.USE_OAK_ITEM_BASE_REWARD;
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Gain the benefit from the ${GameConstants.humanifyString(OakItemType[this.item])} ${this.amount.toLocaleString('en-US')} times.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.item);
        return json;
    }
}