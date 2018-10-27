import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card, CardDeck } from './card.model';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class CardService {

  private readonly cardDecks: string [] = [
    'Druid',
    'Mage',
    'Priest',
    'Warrior',
    'Rogue',
    'Shaman',
    'Hunter',
    'Warlock',
  ];
  private readonly ALLOWED_DECKS = ['classes', 'factions', 'qualities', 'types', 'races'];
  private readonly HS_API_URL = 'https://omgvamp-hearthstone-v1.p.mashape.com';
  private readonly API_KEY = 'AHO0VxRkngmshAhhV71QrhY2L18Gp15Iaf0jsngit6k7FWjdj7';

  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
  }

  getAllCardDecks(): Observable<CardDeck[]> {
    this.headers = new HttpHeaders({'X-Mashape-Key': this.API_KEY});
    return this.httpClient.get<any>(`${this.HS_API_URL}/info`, {headers: this.headers}).pipe(
        map(response => this.responseToCardDecks(response)),
    );
  }

  getCardsByDeck(cardDeckGroup: string, cardDeck: string): Observable<Card[]> {
    return this.httpClient.get<any>(`${this.HS_API_URL}/cards/${cardDeckGroup}/${cardDeck}`, {headers: this.headers});
  }

  private responseToCardDecks(response: any): CardDeck[] {
    return this.ALLOWED_DECKS.map((deckName: string) => ({name: deckName, types: response[deckName]}));
  }
}