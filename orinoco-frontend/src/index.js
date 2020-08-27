import showAllTeddies from './shop';
import showDetailsAndCustomize from './customize';
import showTeddiesInBasket from './order';
import userInputsChecking from './secure';
import showConfirmationOfOrder from './thanks';

import {keepTeddy, fillInOrder, confirmOrder} from './events';

//Page Selection - Construire l'affichage de la liste des produits
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Sélection') {

    // Gestion PARCOURS UTILISATEUR - Afficher les oursons disponibles à l'adoption
    showAllTeddies();
}

// Page Produit - Personnaliser le produit sélectionné
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Produit') {	

    // Gestion PARCOURS UTILISATEUR - Afficher le détail d'un ourson et les coloris disponibles
    showDetailsAndCustomize();

    // Gestion EVENEMENT - Bouton AJOUTER AU PANIER
    keepTeddy();

    // Gestion EVENEMENT - Bouton PASSER LA COMMANDE
    fillInOrder();
}

// Page Panier - Résumer les articles à commander + Enregistrer les coordonnées du client
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Panier') {

    // Gestion PARCOURS UTILISATEUR - Afficher les oursons ajoutés au panier de commande
    showTeddiesInBasket();

    // Gestion EVENEMENT - INPUTS Gestion de la saisie utilisateur
    userInputsChecking();

    // Gestion EVENEMENT - Bouton CONFIRMER LA COMMANDE
    confirmOrder();
}

// Page Remerciement - Remerciement du client et affichage du numéro de commande enregistré
if (document.getElementsByTagName('title')[0].innerHTML == 'Orinoco - Commande enregistrée. Merci !') {

    // Gestion PARCOURS UTILISATEUR - Afficher le récapitulatif de commande envoyé au serveur
    showConfirmationOfOrder();
}
