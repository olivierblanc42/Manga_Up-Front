import { BasketLine } from './../types.d';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

    basketLine=new BehaviorSubject<BasketLine[]>([])
    currenBasketLine=this.basketLine.asObservable();

    nbArticles=new BehaviorSubject<number>(0)
    currentNbArticles=this.nbArticles.asObservable();

    basketLines: BasketLine[]=[];

    constructor() { 
        
    }

    /**
     * Récupères le nombre d'articles ajouté au panier et l'enregistre dans le localstorage.
     * Ajoute le nombre total d'articles dans la méthode next.
     * @param nbArticles 
     */
    nbArticlesIntoBasket(idUser: number, idManga: number){
        let nbArticles=0;
        console.log("L29 cart.service nbArticles", nbArticles)
        
        if(localStorage.getItem('basketLines') === 'undefined' || localStorage.getItem('basketLines') === null){
            
            // On crée une la 1er ligne.
            this.basketLines?.push({
                id_basket_line: '', 
                quantity: 1, 
                id_user: idUser, 
                id_manga: idManga,
                manga: null,
            });
            
        }else{
            this.basketLines=JSON.parse(localStorage.getItem('basketLines')!);
            let idx=0;
            idx=this.basketLines.findIndex((elem)=>elem.id_manga === idManga);
            
            if(idx >= 0){
                this.basketLines[idx].quantity+=1;
                console.log("idx >= 0", this.basketLines[idx].quantity);
                
            }else if(this.basketLines.find((elem)=>elem.id_manga === idManga) === undefined){
                
                // On crée une nouvelle ligne.
                this.basketLines?.push({
                    id_basket_line: '', 
                    quantity: 1, 
                    id_user: idUser, 
                    id_manga: idManga,
                    manga: null,
                });
            }
        }

        console.log("L63 cart.service nbArticles", nbArticles); // donne 202 au lieu de 201
        
        this.basketLines?.map((line: BasketLine) => {
            console.log("L62 cart.service line.quantity", line.quantity)
            nbArticles+=line.quantity;
        });
        
        console.log("L66 cart.service nbArticles", nbArticles); // donne 202 au lieu de 201
        
        this.setNbArticles(nbArticles);
        this.nbArticles.next(nbArticles);

        localStorage.setItem('basketLines', JSON.stringify(this.basketLines))
    }

    getBasketLines(){
        return JSON.parse(localStorage.getItem('basketLines') || '[]')
    }

    setBasketLines(basketLines: BasketLine[]){
        localStorage.setItem('basketLines', JSON.stringify(basketLines))
    }

    setNbArticles(nbArticles: number){
        localStorage.setItem('nbArticles', JSON.stringify(nbArticles))
        this.nbArticles.next(nbArticles);
    }

    getNbArticles(){
        return JSON.parse(localStorage.getItem('nbArticles') || '0');
    }

    setLineOrder(){
        localStorage
    }
    
}
