const db = require("../api/Models/index.js")
const story = db.Story



// Delete Completed Stories

async function storyJob1 () {
	
	const allUsersStory = await story.findAll()
	if (!allUsersStory) return	console.log();

	// Loop through all the data in the data in our db
	allUsersStory.forEach(async(oneStory) => {

		// check if story is expired
		if ( Date.now() >= oneStory.expirationTime ){
			// delete story
			story.destroy({
				where: {
					id: oneStory.id
				}
			})
			console.log("Story Deleted ...");
		}	

	} )
	

}




module.exports = { storyJob1 }



