//Toggle mobile menu

class MobileMenu {
	constructor() {
		this.menuIcon = $(".site-header__menu-icon");
		this.menuContent = $(".site-header__menu-content");
		this.siteHeader = $(".site-header");
		this.events();
	}

	events() {
		this.menuIcon.click(this.toggleMenu.bind(this));
	}

	toggleMenu() {
		this.menuContent.toggleClass("site-header__menu-content--is-displayed");
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
	}
}


var mobileMenu = new MobileMenu();


//reveal on scroll

class RevealOnScroll {
	constructor(els, offset) {
		this.itemsToReveal = els;
		this.offsetPercentage = offset;
		this.hideInitially();
		this.createWaypoints();

	}

	hideInitially() {
		this.itemsToReveal.addClass("reveal-item");
	}

	createWaypoints() {
		var that = this;
		this.itemsToReveal.each(function() {
			var currentItem = this;
			new Waypoint({
				element: currentItem,
				handler: function() {
					$(currentItem).addClass("reveal-item--is-visible");
				},
				offset: that.offsetPercentage
			});
		});
	}
}

var revealOnScrollExpertise = new RevealOnScroll($(".expert-item"), "80%");


//sticky header


class StickyHeader {
	constructor() {
		this.siteHeader = $(".site-header");
		this.headerTriggerElement = $(".large-hero__title");
		this.pageSections = $(".page-section");
		this.headerLinks = $(".primary-nav a");
		this.createHeaderWaypoint();
		this.createPageSectionWaypoints();
		this.resetPageSectionWaypoints();
		this.smoothScroll();

	}

	smoothScroll() {
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElement[0],
			handler: function(direction) {
				if (direction == "down") {
					that.siteHeader.addClass("site-header--dark");
				} else {
					that.siteHeader.removeClass("site-header--dark");
				}
			}
		});
	}

	createPageSectionWaypoints() {
		var that = this;
		this.pageSections.each(function() {
			var currentPageSection = this;
			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == "down") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					} 
				},
				offset: "18%"

			}); 
			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == "up") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
						that.headerLinks.removeClass("is-current-link");
						$(matchingHeaderLink).addClass("is-current-link");
					} 
				},
				offset: "-50%"

			}); 
		});
	}

	resetPageSectionWaypoints() {
        var that = this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function(direction) {
               if (direction == "up") {
                   that.headerLinks.removeClass("is-current-link");
               }
            },
            offset: "-30%"
        });

		
	}

}

var stickyHeader = new StickyHeader();



//modal 

class Modal {
	constructor() {
		this.openModalButton = $(".btn--get-in-touch");
		this.modal = $(".modal");
		this.closeModalButton = $(".modal__close");
		this.events();
	}

	events() {
		//clicking open modal button
		this.openModalButton.click(this.openModal.bind(this));
		//clicking x close modal button
		this.closeModalButton.click(this.closeModal.bind(this));
		//user pushes any key
		$(document).keyup(this.keyPreshHandler.bind(this));
	}

	openModal() {
		this.modal.addClass("modal--is-visible");
		return false; //prevent default behavior of browser scrolling up when link clicked

	}

	closeModal() {
		this.modal.removeClass("modal--is-visible");
	}

	keyPreshHandler(e) {
		if (e.key === "Escape") {
			this.closeModal();
		}
	}
}

var modal = new Modal();


//hover 

// class HoverWork {
// 	constructor() {
// 		this.workElement = $(".work-image-container--zoom");
// 		this.workButton = $(".btn--view-work");
// 		this.events();
// 	}

// 	events() {
// 		this.workElement.on("mouseenter", this.toggleButtonOn.bind(this));
// 		//this.workElement.on("mouseleave", this.toggleButtonOff.bind(this));

// 	}

// 	toggleButtonOn() {
// 		// e.stopPropagation();
// 		// var that = this;
// 		// this.workElement.each(function() {
// 		// 	that.workButton.show();	
// 		// });		


// 	}

// 	//toggleButtonOff() {
// 		// e.stopPropagation();
// 		// var that= this;
// 		// this.workElement.each(function() {
// 		// 	that.workButton.hide();
// 		// });
// 	//}

	
// }

// var hoverWork = new HoverWork();










