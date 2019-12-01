
    $('table').on('scroll', function() {
        $("#" + this.id + " > *").width($(this).width() + $(this).scrollLeft());
      });

      $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $(this).toggleClass('active');
        });
    });