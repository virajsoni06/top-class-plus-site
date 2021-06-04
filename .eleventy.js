const filters = require("./utils/filters.js");
const transforms = require("./utils/transforms.js");
const collections = require("./utils/collections.js");

module.exports = function(eleventyConfig) {
	// Folders to copy to build dir (See. 1.1)
	eleventyConfig.addPassthroughCopy("src/static");

	// Filters
	Object.keys(filters).forEach(filterName => {
		eleventyConfig.addFilter(filterName, filters[filterName]);
	});

	// Transforms
	Object.keys(transforms).forEach(transformName => {
		eleventyConfig.addTransform(transformName, transforms[transformName]);
	});

	// Collections
	Object.keys(collections).forEach(collectionName => {
		eleventyConfig.addCollection(collectionName, collections[collectionName]);
	});

	// This allows Eleventy to watch for file changes during local development.
	eleventyConfig.setUseGitIgnore(false);

	// eleventyConfig.setBrowserSyncConfig({
	// 	callbacks: {
	// 	  ready: function(err, bs) {
	// 		console.log("jinglis coming here");
	// 		bs.addMiddleware("*", (req, res) => {
	// 		  const content_404 = fs.readFileSync('_site/');
	// 		  // Add 404 http status code in request header.
	// 		  res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
	// 		  // Provides the 404 content without redirect.
	// 		  res.write(content_404);
	// 		  res.end();
	// 		});
	// 	  }
	// 	}
	//   });

	return {
		dir: {
			input: "src/",
			output: "dist",
			includes: "_includes",
			layouts: "_layouts"
		},
		templateFormats: ["html", "md", "njk"],
		htmlTemplateEngine: "njk",

		// 1.1 Enable eleventy to pass dirs specified above
		passthroughFileCopy: true
	};
};
