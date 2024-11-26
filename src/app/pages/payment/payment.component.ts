import { Component, ElementRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <form action="#" class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-x-4">
        <div class="min-w-0 flex-1 space-y-8">
            <div class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Choisir une autre adresse de livraison</h2>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label for="your_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Nom </label>
                    <input type="text" id="your_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                </div>

                <div>
                    <label for="your_email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Email </label>
                    <input type="email" id="your_email" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
                </div>

                <div>
                    <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Adresse </label>
                    <input type="email" id="email" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
                </div>

                <div>
                    <label for="company_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Adresse complémentaire </label>
                    <input type="text" id="company_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Flowbite LLC" required />
                </div>

                <div>
                    <label for="vat_number" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Adresse complémentaire </label>
                    <input type="text" id="vat_number" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="DE42313253" required />
                </div>

                <div>
                    <label for="select-city-input-3" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Ville </label>
                    <input type="text" id="your_city" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                </div>

                <div>
                    <label for="select-country-input-3" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Pays </label>
                    <input type="text" id="your_country" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                </div>

                <div>
                    <label for="phone-input-3" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Numéro de téléphone </label>
                    <input type="text" id="phone-input" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                </div>

                <div class="sm:col-span-2">
                <button type="submit" class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                    </svg>
                    Add new address
                </button>
                </div>
            </div>
            </div>

            <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Paiement</h3>

            <div class="payment__box grid grid-cols-1 gap-4 md:grid-cols-3">
                <div (click)="choicePaymentCB($event)" id="payment__box--cb" class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="credit-card" aria-describedby="credit-card-text" type="radio" name="payment-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                        </div>

                        <div class="ms-4 text-sm">
                            <label for="credit-card" class="font-medium leading-none text-gray-900 dark:text-white"> Carte bancaire </label>
                        </div>
                    </div>
                    <div class="payment__box--icon-hide"><fa-icon class="" [icon]="faCaretDown"></fa-icon></div>
                </div>
                
                <div (click)="choicePaymentCheque($event)" id="payment__box--cheque" class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="pay-on-delivery" aria-describedby="pay-on-delivery-text" type="radio" name="payment-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                        </div>

                        <div class="ms-4 text-sm">
                            <label for="pay-on-delivery" class="font-medium leading-none text-gray-900 dark:text-white"> Paiement par chèque </label>
                        </div>
                    </div>
                    <div class="payment__box--icon-hide"><fa-icon class="" [icon]="faCaretDown"></fa-icon></div>
                </div>

                <div (click)="choicePaymentPaypal($event)" id="payment__box--paypal" class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="paypal-2" aria-describedby="paypal-text" type="radio" name="payment-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                        </div>

                        <div class="ms-4 text-sm">
                            <label for="paypal-2" class="font-medium leading-none text-gray-900 dark:text-white"> Paypal </label>
                        </div>
                    </div>
                    <div class="payment__box--icon-hide"><fa-icon class="" [icon]="faCaretDown"></fa-icon></div>
                </div>
            </div>
            </div>

            <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Livraison</h3>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="dhl" aria-describedby="dhl-text" type="radio" name="delivery-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" checked />
                        </div>

                        <div class="ms-4 text-sm">
                            <label for="dhl" class="font-medium leading-none text-gray-900 dark:text-white"> Standard 8€25 </label>
                            <p id="dhl-text" class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Livré sous 48h minimum</p>
                        </div>
                    </div>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="express" aria-describedby="express-text" type="radio" name="delivery-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                        </div>

                        <div class="ms-4 text-sm">
                            <label for="express" class="font-medium leading-none text-gray-900 dark:text-white"> Chronopost classique 12€95</label>
                            <p id="express-text" class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Livré sous 24h</p>
                        </div>
                    </div>
                </div>

                <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                    <div class="flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="fedex" aria-describedby="fedex-text" type="radio" name="delivery-method" value="" class="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                        </div>

                        <div class="ms-4 text-sm">
                            <label for="fedex" class="font-medium leading-none text-gray-900 dark:text-white"> Chronopost Express 13€95 </label>
                            <p id="fedex-text" class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Livré demain avant 10h</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <div class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Commande</h2>
            <div class="flow-root">
            <div class="my-1 divide-y divide-gray-200 dark:divide-gray-800">
                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">$8,094.00</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                <dd class="text-base font-medium text-green-500">0</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">$199</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4 py-3">
                <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">$8,392.00</dd>
                </dl>
            </div>
            </div>

            <div class="space-y-3">
            <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Payment</button>

            <p class="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
            </div>
        </div>
        </div>
    </form>
    </section>
  `,

    styles: [`

        .payment__box--icon-hide{
            display: none;
        }
        
        .payment__box--icon-show{
            display: block;
        }

        .payment__box--border{
            position: relative;
            border: 3px solid rgb(25, 33, 44);
        }

        .payment__box--icon-triangle{
            display:none;
            position: absolute;
            top: 62%;
            left: 46%;
            font-size: 2rem;
            color: rgb(25, 33, 44);
        }
    `]
})

export class PaymentComponent {
    protected readonly faCaretDown = faCaretDown;

    constructor(
        private elementRef:ElementRef,
    ){

    }

    ngOnInit(){
        // récupérer l'address + price

    }

    

    choicePaymentCB(event: Event){
        event.stopPropagation();
        const paymentBoxCB=this.elementRef.nativeElement.querySelector('#payment__box--cb');
        const paymentBoxIconHide=paymentBoxCB.querySelector('.payment__box--icon-hide');
        console.log("paymentBoxCB :", paymentBoxCB);
        //paymentBoxCB.style.backgroundColor="red"
        paymentBoxIconHide.classList.toggle('payment__box--icon-show')
    }
    
    choicePaymentCheque(event: Event){
        //event.stopPropagation();
        //console.log(event.target);
          
        const paymentBoxCheque=this.elementRef.nativeElement.querySelector('#payment__box--cheque');
        const paymentBoxIconHide=paymentBoxCheque.querySelector('.payment__box--icon-hide');
        console.log("paymentBoxCB :", paymentBoxCheque);
        //console.log((event.target as Element).getAttribute('id'));
        console.log("paymentBoxCheque :", paymentBoxCheque);
        paymentBoxIconHide.classList.toggle('payment__box--icon-show')

        
        //const paymentBox=this.elementRef.nativeElement.querySelector('.payment__box');
        //const paymentBoxIconHide=paymentBox.querySelector('.payment__box--icon-hide');
        //const faIcon= paymentBoxIconHide.querySelector('fa-icon');
        //paymentBox.classList.add('payment__box--border', 'payment__box--icon-triangle', 'payment__box--icon');
        //faIcon.classList.add('payment__box--icon-triangle');
        //paymentBoxIconHide.classList.toggle('payment__box--icon-show', 'payment__box--icon-hide')

    }
    
    choicePaymentPaypal(event: Event){
        const PaymentPaypal=this.elementRef.nativeElement.querySelector('#payment__box--paypal');
        const paymentBoxIconHide=PaymentPaypal.querySelector('.payment__box--icon-hide');
        console.log("PaymentPaypal :", PaymentPaypal);
        paymentBoxIconHide.classList.toggle('payment__box--icon-show')
    }
    //userProfile(event: Event){
    //    event.stopPropagation();
    //    const userInfo=this.elementRef.nativeElement.querySelector("#user-info");
    //    userInfo.style.visibility=userInfo.style.visibility==="visible" ? "hidden" : "visible";
    //    document.body.addEventListener('click', this.closeMenu)
    //}
}
