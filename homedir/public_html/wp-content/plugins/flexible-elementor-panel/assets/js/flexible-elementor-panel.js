( function( $ ) {

    // when the editor is fully load (!!!! IMPORTANt !!!!)
    $( window ).on( 'load', function() {

        //console.log('editor fully load'); // for debugging

        draggablePanel(); // load function draggable panel

        loadFepSettings(); // load the setting FEP and action function

        // add action when click on input vertical resize
        $('#elementor-vertical-mode-switcher-preview-input').click(function() {
            vertical_elementor_panel_toggle();
        });

        // add action for clear a bug from the draggble panel // USE TIPS FOR CONFLICT WITH JS ELEMENTOR
        $('#elementor-mode-switcher').click(function() {
            $("#elementor-panel").css("left", ""); // remove style left: ...
        });

    }); // end load fully editor



    // Show the arrow of switcher elementor editor
    function elementor_switcher_display_block() {
        $("#elementor-mode-switcher").css("display", "block");
    }
    // Hide the arrow of switcher elementor editor
    function elementor_switcher_display_none() {
        $("#elementor-mode-switcher").css("display", "none");
    }


    // Make Elementor Panel draggable
    function draggablePanel() {

        var panel_size_width = localStorage.getItem('elementor-panel-size-width');
        var panel_size_height = localStorage.getItem('elementor-panel-size-height');

        var panel_pos_top = localStorage.getItem('elementor-panel-pos-top');
        var panel_pos_left = localStorage.getItem('elementor-panel-pos-left');

        var in_move = localStorage.getItem('in-move');



        //console.log(panel_pos_top + '-' + panel_pos_left);

        $("#elementor-panel").resize(function(ui) {

            panelWidth = $("#elementor-panel").width();
            panelHeight = $("#elementor-panel").height();

            localStorage.setItem('elementor-panel-size-width', panelWidth);
            localStorage.setItem('elementor-panel-size-height', panelHeight);

            //console.log( panelWidth + '-' + panelHeight ); // for debugging
        });

        //console.log( panel_size_height + '-' + $(window).height() ); // for debugging

        // at the load, check if the panel stay in corner left (look like normal)
        if ( in_move == null || in_move == '0' || panel_pos_top == '0' && panel_pos_left == '0' && panel_size_height == $(window).height() || panel_pos_top === null && panel_pos_left === null || panel_pos_top === null && panel_pos_left === null && panel_size_height === null ) {

            $('body').removeClass('cws-preview-full').addClass('cws-preview-boxed'); // make the preview be boxed
            elementor_switcher_display_block(); // show the switcher

        } else {

            // check if the panel is oversize of windows height and panel more up of top windows
            if ( panel_size_height >= $(window).height() || panel_pos_top < '0' ) {
                $("#elementor-panel").css({ 'top': '0px', 'left': panel_pos_left + 'px' }); // move the panel at the save position but force top 0
                $("#elementor-panel").css("height", $(window).height() - parseInt($("#elementor-panel").css("top"))); // remove the force height
                panel_size = {width: panel_size_width + 'px', height: $(window).height() + 'px'};
            } else {
                $("#elementor-panel").css({ 'top': panel_pos_top +'px', 'left': panel_pos_left + 'px' }); // move the panel at the save position
                panel_size = {width: panel_size_width + 'px', height: panel_size_height + 'px'};
            }

            $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed'); // make the preview be full
            $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-e"); // remove resizable the right side of panel editor
            $(".elementor-panel > .ui-resizable-handle").addClass("ui-resizable-all"); // add resizable all panel editor
            elementor_switcher_display_none(); // hide the switcher
            if( panel_size_width != null && panel_size_height != null ) {
                $("#elementor-panel").css(panel_size); //set the height and width of panel editor
            }
        }

        // draggable panel !! al right ;)
        $("#elementor-panel").draggable({
            snap: "#elementor-preview",
            opacity: 0.7,
            cancel: ".not-draggable",
            addClasses: false,
            containment: "window",
            snapMode: "inner",
            snapTolerance: 25,
            start: function () {

                memo = $(this).css('transition'); // add the memo transition to #elementor-panel
                $(this).css('transition', 'none');

                // add class "in-move" when panel is in move
                $("#elementor-panel").addClass("in-move");
                localStorage.setItem('in-move', 1);

            },
            stop: function (event, ui) {
                //console.log(ui.position.top + '-' + ui.position.left); // for debugging

                $(this).css('transition', memo); // add the memo transition to #elementor-panel

                localStorage.setItem('elementor-panel-pos-top', ui.position.top);
                localStorage.setItem('elementor-panel-pos-left', ui.position.left);

            }
        });

        $("#elementor-panel-content-wrapper").addClass("not-draggable"); // add class for disable the draggable at wrapper area
        $("#elementor-panel-footer").addClass("not-draggable"); // add class for disable the draggable at footer area
        $("#elementor-mode-switcher").addClass("not-draggable"); // add class for disable the draggable at mode switcher area

    }


    // MOUSEDOWN (at the click mouse)
    function mousedownHeaderTitle() {

        $("#elementor-preview").css("pointer-events", "none"); // disable pointer on the preview elementor

        if ($('#elementor-panel').css('left') === '0px' && $('#elementor-panel').css('top') === '0px') {
            $("#elementor-panel").css("height", "65%");
            $("#elementor-panel-content-wrapper").slideDown(150);
            $("#elementor-panel-footer").slideDown(150);
            $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');
            $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-e"); // remove resizable the right side of panel editor
            $(".elementor-panel > .ui-resizable-handle").addClass("ui-resizable-all"); // add resizable all panel editor
            $("#elementor-preview").css("pointer-events", "none");
            elementor_switcher_display_none();

            // remove class "in-move" when panel back in origine position
            $("#elementor-panel").removeClass("in-move");
            localStorage.setItem('in-move', 0);

        }
        if ($('#elementor-panel').css('right') === '0px' && $('#elementor-panel').css('top') === '0px') {
            $("#elementor-panel").css("height", "65%");
            $("#elementor-panel-content-wrapper").slideDown(150);
            $("#elementor-panel-footer").slideDown(150);
            $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');
            $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-e"); // remove resizable the right side of panel editor
            $(".elementor-panel > .ui-resizable-handle").addClass("ui-resizable-all"); // add resizable all panel editor

            elementor_switcher_display_none();
        }
    }
    // MOUSEUP (at leave the click mouse)
    function mouseupHeaderTitle() {

        $("#elementor-preview").css("pointer-events", ""); // active pointer on the preview elementor

        if ($('#elementor-panel').css('left') === '0px' && $('#elementor-panel').css('top') === '0px') {
            $("#elementor-panel").css("height", $(window).height() + 'px');
            $('body').removeClass('cws-preview-full').addClass('cws-preview-boxed');
            $("#elementor-panel-content-wrapper").slideDown(150);
            $("#elementor-panel-footer").slideDown(150);
            $(".elementor-panel > .ui-resizable-handle").addClass("ui-resizable-e"); // add resizable the right side of panel editor
            $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-all"); // remove resizable all panel editor
            elementor_switcher_display_block();


        }
        if ($('#elementor-panel').css('right') === '0px' && $('#elementor-panel').css('top') === '0px') {
            $("#elementor-panel").css("height", $(window).height() + 'px');
            //$('body').removeClass('cws-preview-full').addClass('cws-preview-boxed');
            $("#elementor-panel-content-wrapper").slideDown(150);
            $("#elementor-panel-footer").slideDown(150);
            $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-e"); // remove
            $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-all"); // remove
        }

        // get after one fast click for back position to origin
        panelWidth = $("#elementor-panel").width();
        panelHeight = $("#elementor-panel").height();

        // save after one fast click for back position to origin
        localStorage.setItem('elementor-panel-size-width', panelWidth);
        localStorage.setItem('elementor-panel-size-height', panelHeight);
    }
    // FUNCTION VERTICAL COLLAPSE/EXPAND ELEMENTOR PANEL
    function vertical_elementor_panel_toggle() {

        // if has class vertical_elementor_panel_toggle-on, dont resize
        if($('#elementor-panel-header-wrapper').hasClass('vertical_elementor_panel_toggle-on')) {

            var panel_size_height = localStorage.getItem('elementor-panel-size-height');

            $('#elementor-panel-header-wrapper').removeClass('vertical_elementor_panel_toggle-on'); // Important, remove class to panel for understand the collapse is off

            if ( panel_size_height == $(window).height() ) {
                $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-all"); // remove resizable all panel editor
            } else {
                $(".elementor-panel > .ui-resizable-handle").addClass("ui-resizable-all"); // add resizable all panel editor
            }

            if( panel_size_height ) {
                $("#elementor-panel").animate({ height: panel_size_height }, 150 ); // add the height px minus the top px
            } else {
                $("#elementor-panel").animate({ height: $(window).height() - parseInt($("#elementor-panel").css("top")) }, 150 ); // add the height px minus the top px
            }

            // resize off like origin panel when the panel is not in move
            if ( !$('#elementor-panel').hasClass('in-move') ) {
                //alert('je suis en pos origin');

                $("#elementor-panel").animate({ height: $(window).height() + 'px' }, 0 ); // add the height px minus the top px
                $('body').removeClass('cws-preview-full').addClass('cws-preview-boxed');
                $(".elementor-panel > .ui-resizable-handle").addClass("ui-resizable-e"); // add resizable the right side of panel editor
                $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-all"); // remove resizable all panel editor
                elementor_switcher_display_block();

            }
            //alert('resize off');


        } else {

            $('#elementor-panel-header-wrapper').addClass('vertical_elementor_panel_toggle-on'); // Important, add class to panel for understand the collapse is on

            $("#elementor-panel").animate({ height: "40px" }, 150 ); // resize the panel to height 40px

            $(".elementor-panel > .ui-resizable-handle").removeClass("ui-resizable-all"); // remove resizable all panel editor

            elementor_switcher_display_none(); // confirm remove swicther
            $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed'); // confirm full preview

            //alert('resize on');

        }

    }


    // Close all categories in panel with the right click
    function collapseCategories(delay) {

        if (delay) {
            delay = 0; // remove transition
        } else {
            delay = 280; // add delay for smoothing
        }

        //alert(localStorage.getItem("cat-closed")); // for debugging

        // remove window click right chrome
        $("#elementor-panel-elements-categories").on("contextmenu",function(){
            return false;
        });

        $('#elementor-panel-elements-categories').mousedown(function(event) {

        if(event.which == 3) { // right click

            if (localStorage.getItem('cat-closed') == 0) {

                $(".elementor-panel-category-items").slideUp(280);
                $(".elementor-panel-category").removeClass("elementor-active");
                $('.elementor-panel-category-items')
                .delay(280)
                .queue(function (next) {
                    $(this).css('display', 'none');
                    next();
                });

                localStorage.setItem('cat-closed', '1');
                //console.log(localStorage.getItem("cat-closed")); // for debugging

            } else {
                $(".elementor-panel-category").addClass("elementor-active");
                $(".elementor-panel-category-items").slideDown(280);
                $(".elementor-panel-category-items").css("display", "block");

                localStorage.setItem('cat-closed', '0');
                //console.log(localStorage.getItem("cat-closed")); // for debugging
            }
        }
        });


        // load conditionnal if the save collapse is "closed"
        if (localStorage.getItem('cat-closed') == 1) {
            $(".elementor-panel-category-items").slideUp(delay);
            $(".elementor-panel-category").removeClass("elementor-active");
            $('.elementor-panel-category-items')
            .delay(delay)
            .queue(function (next) {
                $(this).css('display', 'none');
                next();
            });
        }

    }

    // Make Categories in elementor panel draggable
    function draggableCategories () {

        $("#elementor-panel-categories").sortable({
            cursor: "move",
            axis: "y",
            opacity: 0.5,
            cancel: ".elementor-element-wrapper",
            create: createPositionsCategories,
            update: refreshPositionsCategories
        });

    }
    function refreshPositionsCategories() {

        // refresh tabindex number by order categorie
        $('.elementor-panel-category').each(function(i) {

            $(this).attr('tabindex', i + 1); // reload tabindex to all single category

            var idCategory = this.id; // get id
            var tabindexCategory = $(this).attr('tabindex'); // get tabindex

            var i = i + 1; // add first number 1

            localStorage.setItem('cat-position-' + tabindexCategory, idCategory); // save position

        });

    }
    function createPositionsCategories() {

        // did action by number of category
        $(".elementor-panel-category").each(function (i) {
            var i = i + 1;

            if ( localStorage.getItem('cat-position-'  + i) ) {
            $("#" + localStorage.getItem('cat-position-'  + i)).appendTo("#elementor-panel-categories"); // clear and put the new order with appendTo
            }
        });

    }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

    // Load the settings FEP
    function loadFepSettings() {
        //console.log(fepConfig); // for debugging

        //add exit icon
        if ( !$( "#fep-exit" ).hasClass( "fep-exit-wrapper" ) ) {
            exit_pannel = '<div id="fep-exit" class="fep-exit-wrapper elementor-panel-footer-tool elementor-leave-open tooltip-target"><a class="fep-exit-link" target="_self" href="http://localhost/wpizi/"><i class="fa fa-sign-out"></i></a></div>';
            $("#elementor-panel-saver-button-preview").after(exit_pannel);
        }

        //add collapse icon
        if ( !$( "#fep-collapse-vertical" ).hasClass( "fep-collapse-vertical-wrapper" ) ) {
            collapse_vertical_pannel = '<div id="fep-collapse-vertical" class="fep-collapse-vertical-wrapper"><input type="checkbox" id="elementor-vertical-mode-switcher-preview-input"><i class="fa fa-arrows-v fep-toggle-panel-icon"></i></div>';
            $("#elementor-panel-header #elementor-panel-header-menu-button").after(collapse_vertical_pannel);
        }

        if (fepConfig.draggable_panel == 'yes') {
            $("#elementor-panel" ).draggable( "enable" );
            $("#elementor-panel-header-title").on('mousedown', mousedownHeaderTitle);
            $("#elementor-panel-header-title").on('mouseup', mouseupHeaderTitle);
            $("#elementor-panel-header-title").css("cursor", "move"); // add cursor to the title editor panel
        }
        if (fepConfig.draggable_panel == 'no') {
            $("#elementor-panel" ).draggable( "disable" );
            $("#elementor-panel-header-title").off('mousedown', mousedownHeaderTitle);
            $("#elementor-panel-header-title").off('mouseup', mouseupHeaderTitle);
            $("#elementor-panel-header-title").css("cursor", ""); // remove special cursor to the title editor panel
        }
        if (fepConfig.minimize_category_space == 'yes') {
            $('body').addClass("fep-minimize-category");
        }
        if (fepConfig.minimize_category_space == 'no') {
            $('body').removeClass("fep-minimize-category");
        }
        if (fepConfig.use_grid_ruler == 'yes') {
            $('body').addClass("fep-elementor-grid-ruler");
        }
        if (fepConfig.use_grid_ruler == 'no') {
            $('body').removeClass("fep-elementor-grid-ruler");
        }
        if (fepConfig.editor_skin == 'dark_pink') {
            $('body').removeClass("nightmode nightmode-orange");
            $('body').addClass("nightmode nightmode-pink");
        }
        if (fepConfig.editor_skin == 'dark_orange') {
            $('body').removeClass("nightmode nightmode-pink");
            $('body').addClass("nightmode nightmode-orange");
        }
        if (fepConfig.editor_skin == 'light') {
            $('body').removeClass("nightmode nightmode-pink nightmode-orange");
        }
        if (fepConfig.dashboard_link_new_tab == 'yes') {
            $(".fep-exit-link").attr("target", "_blank");
        }
        if (fepConfig.dashboard_link_new_tab == 'no') {
            $(".fep-exit-link").attr("target", "_self");
        }
        if (fepConfig.dashboard_link_point == 'page_front') {
            $(".fep-exit-link").attr("href", PageFront.Permalink);
        }
        if (fepConfig.dashboard_link_point == 'page_edit') {
            $(".fep-exit-link").attr("href", window.location.href.replace("&action=elementor", "&action=edit"));
        }
        if (fepConfig.dashboard_link_point == 'page_list') {
            $(".fep-exit-link").attr("href", window.location.href.split('wp-admin')[0] + 'wp-admin/edit.php?post_type=page');
        }
        if (fepConfig.dashboard_link_point == 'elementor_library') {
            $(".fep-exit-link").attr("href", window.location.href.split('wp-admin')[0] + 'wp-admin/edit.php?post_type=elementor_library');
        }
        if (fepConfig.dashboard_link_point == 'admin_dashboard') {
            $(".fep-exit-link").attr("href", window.location.href.split('wp-admin')[0] + 'wp-admin/');
        }
        if (fepConfig.accordion_options == 'yes') {
            $('.elementor-accordion .elementor-tab-title').removeClass('elementor-active');
            $('.elementor-accordion .elementor-tab-content').css('display', 'none');
        }
        if (fepConfig.accordion_options == 'no') {
            $('.elementor-accordion .elementor-tab-title').addClass('elementor-active');
            $('.elementor-accordion .elementor-tab-content').css('display', 'block');
        }
    }


    // Special load and reload when the div #elementor-panel-categories was recreate by elementor
    $.onCreate('#elementor-panel-categories', function() {

        //console.log('div #elementor-panel-categories created'); // for debugging

        // if option checked
        if (fepConfig.minimize_category_space == 'yes') {
            collapseCategories(true); // load function collapse categories
        }

        draggableCategories(); // load function draggable categories

    },true);

    ///////////////////////: Reload function from setting when change option
    $(document).on('change', "input[data-setting='draggable_panel']", function () {
        fepConfig.draggable_panel = $(this).is(':checked') ? 'yes' : 'no';
        loadFepSettings();
    });
    $(document).on('change', "input[data-setting='minimize_category_space']", function () {
        fepConfig.minimize_category_space = $(this).is(':checked') ? 'yes' : 'no';
        loadFepSettings();
    });
    $(document).on('change', "input[data-setting='use_grid_ruler']", function () {
        fepConfig.use_grid_ruler = $(this).is(':checked') ? 'yes' : 'no';
        loadFepSettings();
    });
    $(document).on('change', "select[data-setting='collapsible_panel']", function () {
        fepConfig.collapsible_panel = $(this).is(':checked') ? 'yes' : 'no';
        loadFepSettings();
    });
    $(document).on('change', "select[data-setting='editor_skin']", function () {
        fepConfig.editor_skin = this.value;
        loadFepSettings();
    });
    $(document).on('change', "select[data-setting='dashboard_link_point']", function () {
        fepConfig.dashboard_link_point = this.value;
        loadFepSettings();
    });
    $(document).on('change', "input[data-setting='dashboard_link_new_tab']", function () {
        fepConfig.dashboard_link_new_tab = $(this).is(':checked') ? 'yes' : 'no';
        loadFepSettings();
    });
    $(document).on('change', "input[data-setting='accordion_options']", function () {
        fepConfig.accordion_options = $(this).is(':checked') ? 'yes' : 'no';
        loadFepSettings();
    });
    /////////////// end reload option

    } )( jQuery ); // end load document
