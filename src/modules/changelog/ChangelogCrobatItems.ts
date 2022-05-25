import Changelog, { changelogType } from './Changelog';
import ChangelogUpdate from './ChangelogUpdate';

/**
 * Add your changes to the top of the changelog. Please do not increase the version number.
 *
 * MAJOR - Will stay at 0 during development, 1 after the first public release
 * MINOR - Will increment for each feature refactor or large changes to a feature
 * PATCH - Increment for small changes, bugfixes, UI changes.
 */
const ChangelogCrobatItems = [
    // note that month is 0 indexed, that's why -1
    // v0.2.0
    new ChangelogUpdate('v0.2.0', new Date(2022, 5 - 1, 24)),
    new Changelog(changelogType.NEW, 'Added changelog for this fork'),
    new Changelog(changelogType.CHANGE, 'Added some egg exclusives to the wild (Check repository for the list)'),
    new Changelog(changelogType.CHANGE, 'Height of dungeons tiles now changes dynamically'),
    new Changelog(changelogType.CHANGE, 'Locked bosses now show the unlock requirement in the tooltip'),
    new Changelog(changelogType.NEW, 'Trainer ID added (Menu > Save > Generate Trainer ID)'),
    new Changelog(changelogType.CHANGE, 'Enigma Berry: Discord not required anymore but it requires Trainer ID'),
    new Changelog(changelogType.CHANGE, 'Removed dungeon loot nerf on earlier regions'),
    new Changelog(changelogType.CHANGE, '"Pokéball (by type)" menu is now collapsed by default'),
    new Changelog(changelogType.FIXED, 'Pikachu/Exeggcute now evolves into their alolan forms only in Alola'),
    new Changelog(changelogType.FIXED, 'Pikachu/Exeggcute now evolves into their normal forms only outside Alola'),

    // v0.1.0
    new ChangelogUpdate('v0.1.0', new Date(2022, 4 - 1, 28)),
    new Changelog(changelogType.NEW, 'Added "Dock" button to "Shortcuts" menu'),
    new Changelog(changelogType.NEW, 'Added Pokéball selection for each type'),
    new Changelog(changelogType.CHANGE, 'Oak\'s Items loadouts increased from 3 to 6'),
];

export default ChangelogCrobatItems;