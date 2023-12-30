(function ($) {
    'use strict';

    var browserWindow = $(window);

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: 2.0 Newsticker Active Code
    $.simpleTicker($("#breakingNewsTicker"), {
        speed: 1250,
        delay: 3500,
        easing: 'swing',
        effectType: 'roll'
    });
    
    
    // :: 3.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#deliciousNav').classyNav();
    }

    // :: 4.0 Search Active Code
    var searchwrapper = $('.search-wrapper');
    $('.search-btn').on('click', function () {
        searchwrapper.toggleClass('on');
    });
    $('.close-btn').on('click', function () {
        searchwrapper.removeClass('on');
    });

    // :: 5.0 Sliders Active Code
    if ($.fn.owlCarousel) {
        var welcomeSlide = $('.hero-slides');
        var receipeSlide = $('.receipe-slider');

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['Prev', 'Next'],
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });

        welcomeSlide.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlide.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        var dot = $('.hero-slides .owl-dot');
        dot.each(function () {
            var index = $(this).index() + 1 + '.';
            if (index < 10) {
                $(this).html('0').append(index);
            } else {
                $(this).html(index);
            }
        });

        receipeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['Prev', 'Next'],
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });
    }

    // :: 6.0 Gallery Active Code
    if ($.fn.magnificPopup) {
        $('.videobtn').magnificPopup({
            type: 'iframe'
        });
    }

    // :: 7.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-angle-up"></i>'
        });
    }

    // :: 8.0 CouterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: 9.0 nice Select Active Code
    if ($.fn.niceSelect) {
        $('select').niceSelect();
    }

    // :: 10.0 wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }

    // :: 11.0 prevent default a click
    $('a[href="#"]').click(function ($) {
        $.preventDefault()
    });

   // Sample data
   let recipes = [
    { name: 'Spaghetti Bolognese', ingredients: 'Ground beef, onion, garlic, tomato sauce, spaghetti', instructions: '1. Cook spaghetti.\n2. Brown beef with onion and garlic.\n3. Add tomato sauce.\n4. Mix with cooked spaghetti.', imageURL: 'img/bg-img/breadcumb1.jpg', videoURL: 'https://www.youtube.com/watch?v=video1' },
    { name: 'Chocolate Chip Cookies', ingredients: 'Butter, sugar, eggs, flour, chocolate chips', instructions: '1. Cream butter and sugar.\n2. Add eggs.\n3. Mix in flour and chocolate chips.\n4. Bake at 350°F for 10 minutes.', imageURL: 'img/bg-img/cookies.jpg', videoURL: 'https://www.youtube.com/watch?v=video2' }
];

function displayRecipes() {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';
        recipeDiv.innerHTML = `
        <h3 style="text-align: center;">${recipe.name}</h3>
            <img class="recipe-image" src="${recipe.imageURL}" alt="${recipe.name} image">
            <p><strong>Ingredients:</strong><br>${recipe.ingredients.split(',').join('<br>')}</p>
            <p><strong>Instructions:</strong><br>${formatInstructions(recipe.instructions)}</p>
            <p><strong>Video:</strong> <a href="${recipe.videoURL}" target="_blank">${recipe.videoURL}</a></p>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeContainer.appendChild(recipeDiv);
    });
}

function formatInstructions(instructions) {
    return instructions.split('\n').join('<br>');
}

function previewImage() {
    const input = document.getElementById('imageUpload');
    const preview = document.getElementById('previewImage');

    input.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                preview.src = reader.result;
                preview.style.display = 'block';
            });

            reader.readAsDataURL(file);
        }
    });
}

function previewVideo() {
    const input = document.getElementById('videoURL');
    const preview = document.getElementById('videoPreview');

    input.addEventListener('change', function () {
        const videoURL = this.value;
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        if (youtubeRegex.test(videoURL)) {
            const videoID = videoURL.match(youtubeRegex)[4];
            preview.innerHTML = `<iframe width="300" height="200" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allowfullscreen></iframe>`;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    });
}

function saveRecipe() {
    const recipeForm = document.getElementById('recipeForm');
    const name = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const imageUpload = document.getElementById('imageUpload').files[0];
    const videoURL = document.getElementById('videoURL').value;

    if (name && ingredients && instructions) {
        const newRecipe = { name, ingredients, instructions, videoURL };

        if (imageUpload) {
            newRecipe.imageURL = URL.createObjectURL(imageUpload);
        }

        const editIndex = recipeForm.getAttribute('data-edit-index');
        if (editIndex !== null) {
            recipes[editIndex] = newRecipe;
            recipeForm.removeAttribute('data-edit-index');
        } else {
            recipes.push(newRecipe);
        }

        recipeForm.reset();

        document.getElementById('previewImage').style.display = 'none';
        document.getElementById('videoPreview').style.display = 'none';

        displayRecipes();
    } else {
        alert('Please fill in all required fields');
    }
}

function editRecipe(index) {
    const recipe = recipes[index];
    const recipeForm = document.getElementById('recipeForm');

    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;
    document.getElementById('videoURL').value = recipe.videoURL;

    recipeForm.setAttribute('data-edit-index', index);

    if (recipe.imageURL) {
        document.getElementById('previewImage').src = recipe.imageURL;
        document.getElementById('previewImage').style.display = 'block';
    }

    if (recipe.videoURL) {
        document.getElementById('videoPreview').innerHTML = `<iframe width="300" height="200" src="https://www.youtube.com/embed/${getVideoId(recipe.videoURL)}" frameborder="0" allowfullscreen></iframe>`;
        document.getElementById('videoPreview').style.display = 'block';
    }
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    displayRecipes();
}

function getVideoId(url) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[4] : null;
}

previewImage();
previewVideo();
displayRecipes();
})(jQuery);