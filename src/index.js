document.addEventListener('DOMContentLoaded', function() {
    const dogBar = document.getElementById('dog-bar');

    fetch('https://your-server-endpoint.com/pups') // Replace with your actual server endpoint
        .then(response => response.json())
        .then(data => {
            data.forEach(pup => {
                const pupSpan = document.createElement('span');
                pupSpan.textContent = pup.name;
                dogBar.appendChild(pupSpan);
            });
        })
        .catch(error => {
            console.error('Error fetching pup data:', error);
        });
});
document.addEventListener('DOMContentLoaded', function() {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const filterButton = document.getElementById('filter-btn');
    let filterGoodDogs = false; // Initially filter is off

    // Step 2: Fetch pups data from server and add spans to dog bar
    fetchPupsAndAddToDogBar();

    function fetchPupsAndAddToDogBar() {
        fetch('https://your-server-endpoint.com/pups') // Replace with your actual server endpoint
            .then(response => response.json())
            .then(data => {
                data.forEach(pup => {
                    const pupSpan = document.createElement('span');
                    pupSpan.textContent = pup.name;
                    pupSpan.addEventListener('click', () => showPupInfo(pup)); // Add click event listener
                    dogBar.appendChild(pupSpan);
                });
            })
            .catch(error => {
                console.error('Error fetching pup data:', error);
            });
    }

    // Step 3: Show pup info in dog-info div when pup span is clicked
    function showPupInfo(pup) {
        dogInfo.innerHTML = ''; // Clear previous content

        const img = document.createElement('img');
        img.src = pup.image; // Assuming pup.image contains the URL of the image
        dogInfo.appendChild(img);

        const h2 = document.createElement('h2');
        h2.textContent = pup.name;
        dogInfo.appendChild(h2);

        const button = document.createElement('button');
        button.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
        button.addEventListener('click', () => toggleGoodDog(pup)); // Add click event listener
        dogInfo.appendChild(button);
    }

    // Step 4: Toggle good dog status and update server
    function toggleGoodDog(pup) {
        pup.isGoodDog = !pup.isGoodDog; // Toggle isGoodDog status
        const button = document.querySelector('#dog-info button');
        button.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

        // Update the server with the new isGoodDog status
        fetch(`https://your-server-endpoint.com/pups/${pup.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isGoodDog: pup.isGoodDog })
        })
        .then(response => response.json())
        .then(updatedPup => {
            // Optionally handle the response from the server after update
            console.log('Pup updated successfully:', updatedPup);
        })
        .catch(error => {
            console.error('Error updating pup:', error);
        });
    }

    // Step 5 (Bonus): Toggle filter for showing only good dogs
    filterButton.addEventListener('click', toggleFilter);

    function toggleFilter() {
        filterGoodDogs = !filterGoodDogs;
        filterButton.textContent = filterGoodDogs ? 'Filter good dogs: ON' : 'Filter good dogs: OFF';

        // Clear current dog-bar content
        dogBar.innerHTML = '';

        // Fetch pups data again and filter based on filterGoodDogs
        fetchPupsAndAddToDogBar();
    }
});
