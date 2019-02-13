function reload() {
	$("body").animate({opacity: 1}, 1000);
	$(".default-button-container-lg").each(function() {
		$(this).outerHeight($(this).find(".default-button-lg").outerHeight());
		$(this).outerWidth($(this).find(".default-button-lg").outerWidth());
	});

	$(".default-button-container-sm").each(function() {
		$(this).outerHeight($(this).find(".default-button-sm").outerHeight());
		$(this).outerWidth($(this).find(".default-button-sm").outerWidth());
	});

	$(".highlight-container").hover(function() {
		$(".highlight").clearQueue();
		$(this).find(".highlight").animate({
			opacity: 1,
			bottom: "-8px"
		}, 250);
	}, function() {
		$(this).find(".highlight").animate({
			opacity: 0,
			bottom: "-20px"
		}, 250);
	});
}

function wavingEmoji() {
	$(".waving").animate({ marginLeft: "40px",deg:90},{
		duration: 350,
		step: function(deg) {
			$(this).css({transform: "rotate("+deg+"deg)"});
		},
		complete: function() {
			$(this).animate({marginLeft: "0", deg:0}, {
				duration: 350,
				step: function(deg) {
					$(this).css({transform: "rotate("+deg+"deg)"});
				}
			});
		}
	}, 5000);
}

$(window).bind("load", function() {
	setTimeout(wavingEmoji, 1000);
	setInterval(wavingEmoji, 5000);

	$('.techdegree-view').tilt({
		glare: true,
		maxGlare: .75
	});

	fetch('/projects.json')
	.then(function(res) {
		return res.json();
	})
	.then(function(projects) {
		projects.projects.forEach((project, index) => {
			index < 10 ? index = `0${index + 1}` : index = index;
			const technologies = project.technologies.join(" &middot; ");
			$("#projects").prepend(`<div class="project clearfix">
				<div class="project-view-outter">
					<div class="project-view-container">
						<div class="project-view">
							<img src="${project.view}" alt="${project.title}">
						</div>
					</div>
				</div>
				<div class="project-details-outter">
					<div class="project-details">
						<h2 class="project-number">#${index}</h2>
						<h5 class="project-technologies">${technologies}</h5>
						<h2 class="project-title">${project.title}</h2>
						<p class="project-description">${project.description}</p>
						<div class="default-button-container-sm">
							<a href=${project.url} target="_black">
								<div class="default-button-sm">
									<span>visit project <i class="far fa-arrow-alt-circle-right"></i></span></div>
							</a>
						</div>
					</div>
				</div>
			</div>`);
			
			reload();
		});
	}).then(function() {
		$("img").on("load", function() {
			$(".project-view").each(function() {
				$(this).height($(".project-view img").height());
			});
		});
	});

});