import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/film';

@Pipe({
  name: 'filmFilter'
})
export class FilmFilterPipe implements PipeTransform {

  transform(value: Film[], ...args: string[]): Film[] {
    let search = args[0].toLowerCase();
    if (search.length > 2) {

      return value.filter(film => (film.title.toLowerCase().indexOf(search) > -1 || film.director.toLowerCase().indexOf(search) > -1 || film.cast.map(actor => actor.firstname + ' ' + actor.lastname).join().toLowerCase().indexOf(search) > -1));
    }
    return value;
  }

}
