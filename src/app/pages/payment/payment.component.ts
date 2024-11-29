import { CartService } from './../../services/cart.service';
import { AccountService } from './../../services/account.service';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { BasketLine, Manga, User } from '../../types';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [FontAwesomeModule],
    template: `
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div id="payment__container" class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-x-4">
        <div class="min-w-0 flex-1 space-y-8">

            <!-- CHOOSING A DELIVERY ADDRESS -->
            <div class="space-y-4">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Choisir une autre adresse de livraison</h2>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label for="your_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Nom </label>
                        <input type="text" id="name" name="name" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.lastname}}" required />
                    </div>

                    <div>
                        <label for="your_email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Email </label>
                        <input type="email" id="email" name="email" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.email}}" required />
                    </div>

                    <div>
                        <label for="address" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Adresse </label>
                        <input type="text" id="address" name="address" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.address?.line1}}" required />
                    </div>

                    <div>
                        <label for="line1" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Adresse complémentaire </label>
                        <input type="text" id="line1" name="line1" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.address?.line2}}" required />
                    </div>

                    <div>
                        <label for="line2" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Adresse complémentaire </label>
                        <input type="text" id="line2" name="line2" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.address?.line3}}" required />
                    </div>

                    <div>
                        <label for="postal-code" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Code postal </label>
                        <input type="text" id="postal-code" name="postal-code" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.address?.postalCode}}" required />
                    </div>

                    <div>
                        <label for="city" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Ville </label>
                        <input type="text" id="city" name="city" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.address?.city}}" required />
                    </div>

                    <div>
                        <label for="department" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Département </label>
                        <input type="text" id="department" name="department" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.address?.department}}" required />
                    </div>

                    <div>
                        <label for="country" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Pays </label>
                        <input type="text" id="country" name="country" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="{{user?.address?.country}}" required />
                    </div>

                    <div>
                        <label for="phone" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Numéro de téléphone </label>
                        <input type="text" id="phone" name="phone" 
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="{{getUserPhone(user!)}}" required />
                    </div>

                    <div class="sm:col-span-2">
                    <button type="submit" class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                        </svg>
                        Ajouter une nouvelle adresse
                    </button>
                    </div>
                </div>
            </div>

            <!-- CHOICE OF DELIVERY -->
            <form class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Livraison</h3>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div (click)="choiceDeliveryStandard()" id="choice-delivery__box--standard" class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div class="flex items-start">
                            <div class="flex h-5 items-center">
                                <input id="choice-deliver__input--standard" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                            </div>

                            <div class="ms-4 text-sm">
                                <label for="choice-deliver__input--standard" class="font-medium leading-none text-gray-900 dark:text-white"> Standard 8€25 </label>
                                <p id="dhl-text" class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Livré sous 48h minimum</p>
                            </div>
                        </div>
                    </div>
                    
                    <div (click)="choiceDeliveryChronopost()" id="choice-delivery__box--chronopost" class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div class="flex items-start">
                            <div class="flex h-5 items-center">
                                <input id="choice-deliver__input--chronopost" aria-describedby="express-text" type="radio" name="delivery-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                            </div>

                            <div class="ms-4 text-sm">
                                <label for="choice-deliver__input--chronopost" class="font-medium leading-none text-gray-900 dark:text-white"> Chronopost classique 12€95</label>
                                <p id="express-text" class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Livré sous 24h</p>
                            </div>
                        </div>
                    </div>

                    <div (click)="choiceDeliveryChronopostExpress()" id="choice-delivery__box--chronopostExpress" class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <div class="flex items-start">
                            <div class="flex h-5 items-center">
                                <input id="choice-deliver__input--chronopost-express" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                            </div>

                            <div class="ms-4 text-sm">
                                <label for="choice-deliver__input--chronopost-express" class="font-medium leading-none text-gray-900 dark:text-white"> Chronopost Express 13€95 </label>
                                <p id="fedex-text" class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Livré demain avant 10h</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <!-- CHOICE OF PAYMENT -->
            <div class="space-y-4">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Paiement</h3>

                <div (click)="choicePayment()" class="choice-payment__box grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div (click)="choicePayementCard()" id="choice-payment__box--card" class="choice-payment__box--border rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <img class="choice-payment__box--img" src="/assets/img/credit-card.png" title="image transfer-bank">
                        <div class="flex items-start justify-center">
                            <div class="flex h-5 items-center">
                                <input id="choice-payment__input--card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                            </div>

                            <div class="ms-4 text-sm">
                                <label for="choice-payment__input--card" class="font-medium leading-none text-gray-900 dark:text-white"> Carte bancaire </label>
                            </div>
                        </div>
                        <div class="choice-payment__box--icon-triangle-cb"><fa-icon class="" [icon]="faCaretDown"></fa-icon></div>
                    </div>

                    <div (click)="choicePayementTransfer()" id="choice-payment__box--transfer" class="choice-payment__box--border rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <img class="choice-payment__box--img" src="/assets/img/transfer-bank.png" title="image transfer-bank">
                        <div class="flex items-start justify-center">
                            <div class="flex h-5 items-center">
                                <input id="choice-payment__input--transfer" aria-describedby="pay-by-transfer-text" type="radio" name="payment-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                            </div>

                            <div class="ms-4 text-sm">
                                <label for="choice-payment__input--transfer" class="font-medium leading-none text-gray-900 dark:text-white"> Virement bancaire </label>
                            </div>
                        </div>
                        <div class="choice-payment__box--icon-triangle-transfer"><fa-icon class="" [icon]="faCaretDown"></fa-icon></div>
                    </div>

                    <div (click)="choicePayementPaypal()" id="choice-payment__box--paypal" class="choice-payment__box--border rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                        <img class="choice-payment__box--img" src="/assets/img/paypal.png" title="image paypal">
                        <div class="flex items-start justify-center">
                            <div class="flex h-5 items-center">
                                <input id="choice-payment__input--paypal" aria-describedby="paypal-text" type="radio" name="payment-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                            </div>

                            <div class="ms-4 text-sm">
                                <label for="choice-payment__input--paypal" class="font-medium leading-none text-gray-900 dark:text-white"> Paypal </label>
                            </div>
                        </div>
                        <div class="choice-payment__box--icon-triangle-paypal"><fa-icon class="" [icon]="faCaretDown"></fa-icon></div>
                    </div>
                </div>

                <form id="payment__box--card" class="payment__box" style="margin-top: 1.5rem;">
                    <div class="flex justify-center  mt-4 col-xs-12 text-center payment-card-autorized">
                        <img class="mx-1" src="/assets/img/payment-cb.png" title="Cartes Bancaires">
                        <img class="mx-1" src="/assets/img/payment-visa.png" title="Visa">
                        <img class="mx-1" src="/assets/img/payment-mastercard.png" title="Mastercard">
                        <img class="mx-1" src="/assets/img/payment-maestro.png" title="Maestro">
                        <img class="mx-1" src="/assets/img/payment-amex.png" title="American Express">
                    </div>

                    <div class="grid gap-4 mt-4">
                        <div>
                            <label class="block text-base font-semibold text-gray-800 mb-2">Numéro de carte :</label>
                            <div class="flex bg-transparent border border-gray-300 rounded-md focus-within:border-purple-500 overflow-hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 ml-3" viewBox="0 0 32 20">
                                    <circle cx="10" cy="10" r="10" fill="#f93232" data-original="#f93232" />
                                    <path fill="#fed049"
                                        d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                                        class="hovered-path" data-original="#fed049" />
                                </svg>
                                <input type="number" placeholder="xxxx xxxx xxxx"
                                    class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm outline-none" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-base font-semibold text-gray-800 mb-2">Titulaire de la carte :</label>
                            <input type="text" placeholder="Prénom et nom"
                                class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none" />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-base font-semibold text-gray-800 mb-2">Date d'expiration :</label>
                                <input type="number" placeholder="08/27"
                                    class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none" />
                            </div>

                            <div>
                                <label class="block text-base font-semibold text-gray-800 mb-2">Code de sécurité :</label>
                                <div class="flex">
                                    <input type="number" placeholder="XXX"
                                        class="px-4 py-3 bg-transparent text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:border-purple-500 outline-none" />
                                    <p class="ml-4">3 ou 4 chiffre selon la carte</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <input checked="checked" class="form-control mr-4" name="cgv" type="checkbox" value="true" id="payment__box--card-input">
                            <label for="payment__box--card-input">Je certifie avoir lu, compris et accepté les <a class="text-blue-800" href="">conditions générales de vente</a></label>
                        </div>
                        
                        <div id="payment__box--card-btn">
                            <button type="submit" class="mt-2 text-sm px-4 py-3 w-full font-semibold tracking-wide bg-purple-600 hover:bg-purple-700 text-white rounded-md">Payer ma commande</button>
                        </div>
                    </div>
                </form>     

                <form method="get" action="" id="payment__box--transfer" class="payment__box" style="margin-top: 1.5rem;">
                    <p id="payment__box--transfer-text">Les instructions pour réaliser le virement seront indiquées sur la page de confirmation de commande et rappelées dans l'email de confirmation de commande. Une fois le virement effectué, comptez 2 à 4 jours ouvrés pour sa validation par nos services ou 2 heures ouvrées si vous optez pour l'option virement instantané proposée par votre banque.</p>
                    <div>
                        <input checked="checked" class="form-control mr-4" name="cgv" type="checkbox" value="true" id="payment__box--transfer-input">
                        <label for="payment__box--transfer-input">Je certifie avoir lu, compris et accepté les <a class="text-blue-800" href="">conditions générales de vente</a></label>
                    </div>

                    <div id="payment__box--transfer-btn">
                        <button type="submit" class="mt-2 text-sm px-4 py-3 w-full font-semibold tracking-wide bg-purple-600 hover:bg-purple-700 text-white rounded-md">Payer ma commande</button>
                    </div>
                </form>

                <form id="payment__box--paypal" class="payment__box" style="margin-top: 1.5rem;">
                    <p class="payment__box--paypal-text">Vous serez redirigé vers le site Paypal afin de valider votre paiement.</p>
                    <div>
                        <input checked="checked" class="form-control mr-4" name="cgv" type="checkbox" value="true" id="payment__box--paypal-input">
                        <label for="payment__box--paypal-input">Je certifie avoir lu, compris et accepté les <a class="text-blue-800" href="">conditions générales de vente</a></label>
                    </div>

                    <div id="payment__box--paypal-btn">
                        <button type="submit" class="mt-2 text-sm px-4 py-3 w-full font-semibold tracking-wide bg-purple-600 hover:bg-purple-700 text-white rounded-md">Valider ma commande</button>
                    </div>
                </form>
            </div>
        </div>

        <div id="command__box" class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Commande</h2>
            <div class="flow-root">
            <div class="my-1 divide-y divide-gray-200 dark:divide-gray-800">

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Sous total HT</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">{{ getSubTotalPriceExcludingTax() }}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Montant TVA (5,5%)</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">{{ getAmountSubTotalVAT() }}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Sous total TTC</dt>
                <dd class="text-base font-medium text-green-500">{{ getSubTotalIncludingVAT() }}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Livraison</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">{{ getDeliveryPrice() }}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Total TTC</dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">{{getTotal()}}</dd>
                </dl>
            </div>
            </div>

            <div class="space-y-3">
            <!--<button type="submit" id="command__box--btn" class="mt-8 text-sm px-4 py-3 w-full font-semibold tracking-wide bg-purple-600 hover:bg-purple-700 text-white rounded-md">Payer ma commande</button>-->

            <!--<p class="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>-->
            </div>
        </div>
    </div>
    </section>
  `,

    styles: [`

        #payment__container{
            //width: 49rem;
            margin-left: 2rem;
        }   

        #payment__box--transfer-btn,
        #payment__box--card-btn,
        #payment__box--paypal-btn{
            width: 12rem;
            margin: auto;
        }

        .choice-payment__box--img{
            width: 5rem;
            margin: auto;
        }

        .payment__box{
            border: 2px solid rgb(118, 109, 97);
            padding: 1rem;
            margin-top: 2rem;
        }

        .payment__box--icon-hide{
            display: none;
        }
        
        .payment__box--icon-show{
            display: block;
        }

        .choice-payment__box--border{
            position: relative;
            border: 2px solid rgb(25, 33, 44);
        }

        .choice-payment__box--icon-triangle-transfer,
        .choice-payment__box--icon-triangle-paypal{
            display:none;
        }

        .choice-payment__box--icon-triangle-cb,
        .choice-payment__box--icon-triangle-transfer,
        .choice-payment__box--icon-triangle-paypal{
            position: absolute;
            top: 84%;
            left: 46%;
            font-size: 2rem;
            color: rgb(25, 33, 44);
        }

        #payment__box--transfer, 
        #payment__box--paypal{
            display:none;
        }

        #command__box--btn{
            width: 12rem;
            margin: auto;
            display: flex;
            justify-content: center;        
        }

        #command__box{
            margin: 64.5rem 2rem 0rem 2rem;
            border: 2px solid rgb(25, 33, 44);
            width: 24rem;
            padding: 0 1rem 1rem 1rem;
            background-color: aliceblue;
        }
    `]
})

export class PaymentComponent {
    protected readonly faCaretDown = faCaretDown;
    user!: User|null;
    basketLines!: BasketLine[];
    x: number=0;


    constructor(
        private elementRef:ElementRef,
        private accountService:AccountService,
        private cartService:CartService,
    ){

    }

    ngOnInit(){
        // récupérer l'address + price
        this.user=this.accountService.getUser();
        this.basketLines=this.cartService.getBasketLines();

        this.getSubTotalPriceExcludingTax();
    }

    //@HostListener('window:scroll', ['$event'])
    //scrollFunction() {
        ////let scrollLimitTop=475;
        //let scrollLimitTop=475;
        //let scrollLimitBottom=800;
        //let commandBox=this.elementRef.nativeElement.querySelector("#command__box");
        //if (document.body.scrollTop < scrollLimitTop || document.documentElement.scrollTop < scrollLimitTop) {
        //    window.scrollTo(0, 0);
        //    //commandBox.style.position = 'fixed'

        //    //console.log("scroll if", this.x+=1);
        //}else if(document.body.scrollTop > scrollLimitBottom || document.documentElement.scrollTop > scrollLimitBottom){
        //    window.scrollTo(0, 0);
        //    //commandBox.style.bottom = '800px';
        //    //commandBox.style.position = 'fixed'
        //}
    //}

    getUserPhone(user: User){
        let str='';
        for (let i = 0, j=0; i < user.phone.length; i++, j++) {
            let cc=user.phone[i];
            if(j < 2){
                str+=cc
            }else{
                str+='-';
                j=-1;
                i--;
            }
        }
       
        return str;
    }

    /**
     * Sous total TTC
     */
    getSubTotalIncludingVAT(){
        let total=0;
       
        this.basketLines.map(elem => {
            total+=this.getSubTotalQtyByManga(elem.manga, elem.quantity)
        });
       
        return Math.round(total*100)/100;
    }

    /**
     * Montant de la quantités acheté d'un manga
     * @param manga 
     * @param quantity 
     * @returns 
     */
    getSubTotalQtyByManga(manga: Manga|null|undefined, quantity: number){
        let price=manga?.price;
        let percentage=manga?.discountPercentage;
        
        if(percentage){
            price=price!-price!*percentage!
            price=Math.round(price*100)/100;
            return price*quantity;
        }

        return price!*quantity;
    }

    /**
     * Total TTC
     */
    getTotal(){
        return this.getSubTotalIncludingVAT()+this.getDeliveryPrice();
    }

    /**
     * Montant sous total TVA.
     */
    getAmountSubTotalVAT(){
        let amountTva=this.getSubTotalIncludingVAT()-this.getSubTotalPriceExcludingTax()
        return Math.round(amountTva*100)/100; 
    }

    /**
     * Sous total HT.
     */
    getSubTotalPriceExcludingTax(){
        let totalIncluTax=this.getSubTotalIncludingVAT();
        let totalExcluTax=totalIncluTax-totalIncluTax*0.055;
        return Math.round(totalExcluTax*100)/100;
    }

    /**
     * Sous de la livraison.
     */
    getDeliveryPrice(){
        return 8.25;
    }
    
    
    
    choiceDeliveryStandard(){
        const input=this.elementRef.nativeElement.querySelector("#choice-deliver__input--standard");
        input.checked = true;        
    }
    
    choiceDeliveryChronopost(){
        const input=this.elementRef.nativeElement.querySelector("#choice-deliver__input--chronopost");
        input.checked = true;
    }
    
    choiceDeliveryChronopostExpress(){
        const input=this.elementRef.nativeElement.querySelector("#choice-deliver__input--chronopost-express");
        input.checked = true;
    }

    choicePayementCard(){
        const input=this.elementRef.nativeElement.querySelector("#choice-payment__input--card");
        input.checked = true;
    }

    choicePayementTransfer(){
        const input=this.elementRef.nativeElement.querySelector("#choice-payment__input--transfer");
        input.checked = true;
    }

    choicePayementPaypal(){
        const input=this.elementRef.nativeElement.querySelector("#choice-payment__input--paypal");
        input.checked = true;
    }

    choicePayment(){
        const inputAll=this.elementRef.nativeElement.querySelectorAll(".choice-payment__box input");
        
        for (let j = 0; j < inputAll.length; j++) {
            console.log("input", inputAll[j]);
            let typePayA=(inputAll[j].id).split("--").pop();
            if( ! inputAll[j].checked){
                const paymentBox=this.elementRef.nativeElement.querySelector('#payment__box--'+typePayA);
                paymentBox.style.display="none";
            }else{
                const paymentBox=this.elementRef.nativeElement.querySelector('#payment__box--'+typePayA);
                paymentBox.style.display="block";
            }
        }
    }
}
