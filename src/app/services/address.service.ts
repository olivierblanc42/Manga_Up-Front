import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Address, AddressDto, Addresses} from '../types';
import { firstValueFrom } from 'rxjs';



@Injectable({
    providedIn: 'root'
})

export class AddressService {

    url="/api/addresses"
    urlDto ="/api/addresses/dto"

    /**
     * Ajoute des options dans le header et dans le body
     */
    options = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*'
        }),
        body: {
            id: '',
        },
    };

    constructor(
        private http: HttpClient
    ) { }

    address = new BehaviorSubject<Address | null>(null);
    currentAddress = this.address.asObservable();
     addresses = new BehaviorSubject<Address[]>([])
     currentAddresses = this.addresses.asObservable();
    // Pagination
    addressesPagination = new BehaviorSubject<Addresses | null>(null)
    currentAddressesPagination = this.addressesPagination.asObservable();

    //DTO
    addressDto = new BehaviorSubject<AddressDto| null>(null)
    currentAddressDto=  this.addressDto.asObservable();
    addressesDto = new BehaviorSubject<AddressDto[]>([]);
    currentAddressesDto = this.addressesDto.asObservable();


    getAddress(id: number){
        firstValueFrom(this.http.get<Address>(`${this.url}/${id}`,
            {  headers: this.options.headers}))
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.address.next(r);
            })
    }

   getAddresses(page: number=0){
       firstValueFrom(this.http.get<Addresses>(`${this.url}?page=${page}`,
           {  headers: this.options.headers}))
           .then((r)=>{
               if(!r) return;
               console.log(r)
               this.addressesPagination.next(r);
           })
   }

   addAddress(address : Omit<AddressDto, "id">){
       firstValueFrom(this.http.post<AddressDto>(this.url,address,{
           headers: this.options.headers
       }))
           .then((r)=>{
               if(!r) return;
               console.log(r)
               this.addressDto.next(r);
           })
   }

     getAddressesDto()  {
       firstValueFrom(this.http.get<AddressDto[]>(this.urlDto,{
           headers: this.options.headers
       }))
           .then((r)=>{
               if(!r) return;
               console.log(r)
               this.addressesDto.next(r);
           })
     }

    updateAddressesDto(){

    }

    removeAddresses(id: number){
        firstValueFrom(this.http.delete<void>(`${this.url}/${id}`, {
                headers: this.options.headers
            })
        )    .then(() => {
            console.log(`Category with ID ${id} has been deleted.`);

        })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });

    }

}