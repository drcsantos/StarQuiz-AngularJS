export class QuizCharacter {
  image: string;
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];

  answer: string;
  isCorrect: boolean;
  showedTip: boolean;

  constructor(person: any) {
    this.name = person.name;
    this.height = person.height;
    this.mass = person.mass;
    this.hairColor = person.hair_color;
    this.skinColor = person.skin_color;
    this.eyeColor = person.eye_color;
    this.birthYear = person.birth_year;
    this.gender = person.gender;

    person.homeworld.subscribe(planet => (this.homeworld = planet.name));
    person.img.subscribe(image => (this.image = image.img));
    person.films.subscribe(
      films =>
        (this.films = films.map(
          film => `Episódio ${film.episode_id}: ${film.title}`
        ))
    );
    person.species.subscribe(
      species =>
        (this.species = species.map(
          specie => specie.name
        ))
    );

    this.answer = null;
    this.isCorrect = false;
    this.showedTip = false;
  }
}

/* {
	'name': 'BB8',
	'height': 'unknown',
	'mass': 'unknown',
	'hair_color': 'none',
	'skin_color': 'none',
	'eye_color': 'black',
	'birth_year': 'unknown',
	'gender': 'none',
	'homeworld': 'https://swapi.co/api/planets/28/',
	'films': [
		'https://swapi.co/api/films/7/'
	],
	'species': [
		'https://swapi.co/api/species/2/'
	],
	'vehicles': [],
	'starships': [],
	'created': '2015-04-17T06:57:38.061346Z',
	'edited': '2015-04-17T06:57:38.061453Z',
	'url': 'https://swapi.co/api/people/87/'
} */
