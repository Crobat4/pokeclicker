/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../Battle.ts" />

class BattleFrontierBattle extends Battle {
    static alternateAttack = false;
    static pokemonIndex: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(3);

    // Looks like we don't need this, unless we want to put a random trainer name or similar
    static trainer: KnockoutObservable<number> = ko.observable(0);

    static counter = 0;

    // Override pokemon attack method so we can ignore the region multiplier
    public static pokemonAttack() {
        // attack twice as fast if we have defeated this stage
        this.alternateAttack = !this.alternateAttack;
        if (this.alternateAttack && BattleFrontierRunner.stage() > App.game.statistics.battleFrontierHighestStageCompleted()) {
            return;
        }
        // Limit pokemon attack speed, Only allow 1 attack per 450ms
        const now = Date.now();
        if (this.lastPokemonAttack > now - 450) {
            return;
        }
        this.lastPokemonAttack = now;
        if (!this.enemyPokemon()?.isAlive()) {
            return;
        }
        this.enemyPokemon().damage(App.game.party.calculatePokemonAttack(this.enemyPokemon().type1, this.enemyPokemon().type2, true));
        if (!this.enemyPokemon().isAlive()) {
            this.defeatPokemon();
        }
    }

    /**
     * Award the player with exp, gems and go to the next pokemon
     */
    public static defeatPokemon() {
        // This needs to stay as none so the stage number isn't adjusted
        App.game.breeding.progressEggsBattle(BattleFrontierRunner.stage(), GameConstants.Region.none);
        this.enemyPokemon().defeat(true);
        // Next pokemon
        GameHelper.incrementObservable(this.pokemonIndex);

        if (this.pokemonIndex() >= 3) {
            // Move on to next stage, reset timer
            BattleFrontierRunner.nextStage();
            this.pokemonIndex(0);
        }

        // If player still challenging Battle Frontier, keep generating Pokemon
        if (BattleFrontierRunner.started()) {
            // Create the next Pokemon to fight
            this.generateNewEnemy();
        } else {
            this.enemyPokemon(null);
        }
    }

    public static generateNewEnemy() {
        //Everything here moved to PokemonFactory
        this.enemyPokemon(PokemonFactory.generateBattleFrontierPokemon());
    }
}
