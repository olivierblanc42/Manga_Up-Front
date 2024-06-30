import { Component } from '@angular/core';

@Component({
  selector: 'app-general-condition',
  standalone: true,
  imports: [],
  template: `

<div class=" py-3 px-10 leading-7 container mx-auto mb-3	">
<h1 class="mb-3">Conditions d'utilisation de MangaUh1 :</h1>
<p><span>1.</span> En accédant et en utilisant le site MangaUp, vous acceptez de vous conformer à ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.</p>
<p><span>2.</span> Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe. Vous êtes également responsable de toutes les activités qui se déroulent sous votre compte.</p>
<p><span>3.</span> Le contenu du site MangaUp est protégé par des droits d'auteur et ne peut être reproduit, distribué ou utilisé à des fins commerciales sans autorisation.</p>
<p><span>4.</span> En utilisant MangaUp, vous acceptez de ne pas publier de contenu offensant, diffamatoire, ou illégal. Tout contenu de ce type sera supprimé et pourrait entraîner la résiliation de votre compte.</p>
<p><span>5.</span> MangaUp se réserve le droit de suspendre ou de résilier votre compte à tout moment, sans préavis, si vous violez ces conditions d'utilisation.</p>
<p><span>6.</span> En utilisant MangaUp, vous consentez à ce que vos données personnelles soient collectées et utilisées conformément à notre politique de confidentialité.</p>
<p>En cas de questions supplémentaires ou de besoin d'assistance, n'hésitez pas à consulter la section d'aide située dans le menu du site MangaUp.</p>
</div>


  `,
  styles: `
  
  .container{
    background-color: rgb(16,16,16,50%);
    border-radius: 10px;
  }
  div{
   h1{
      font-weight:bold;
    }
  }
  
  `
})
export class GeneralConditionComponent {

}
