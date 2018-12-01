$(".project").click((event) => {
	console.log($(this));
	window.location.href = $(event.target).parent(".project").attr("data-href");
});

$(".project .view").tilt({
    scale: 1.08,
    glare: true,
    maxGlare: .5
});

$(".project .view").on("mouseover", (event) => {
	$(".project .view").parent(".project").css("z-index", "0");
	$(event.target).parent(".project").css("z-index", "1");
});

$(".logo").css("height", $(".logo div").height());

$(".logo div").animate({
	top: 0
}, 1000);