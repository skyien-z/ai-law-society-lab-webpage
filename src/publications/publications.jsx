import React, { useEffect, useState } from 'react';

import publicationsJson from "./publications.json"
import PublicationCard from "./publication_card.jsx"

const createYearToPublicationMapping = (filteredPublications) => {
    // Create new JS object with each year mapped to all the publications
    // published in that year
    const yearToPublication = []
    for (const publication of filteredPublications) {
        const publicationsOfYear = yearToPublication.find(
            mapping => mapping.year === publication.year);
        // initialize year to publications object if year hasn't yet been displayed
        if (publicationsOfYear === undefined) {
            yearToPublication.push(
                {   
                    year: publication.year,
                    publications: [ publication ]
                }
            );
        } else {
            // add publication to the object with the proper year
            publicationsOfYear["publications"].push(publication);
        }
    }
    return yearToPublication;
}

const stringifyPublicationDetails = (publication) => {
    // concatenates all publication details together, deliminted by space
    let publicationDetails = "";
    Object.keys(publication).forEach(key => {
        publicationDetails += " " + publication[key];
    })
    return publicationDetails;
}

const patternInTextCaseInsensitive = (text, pattern) => {
    return text.toLowerCase().includes(pattern.toLowerCase());
}

const filterPublicationsOnSearchTerm = (searchTerm) => {
    const filteredPublications = []
    
    for (const publication of publicationsJson) {
        const publicationDetails = stringifyPublicationDetails(publication);
        if (patternInTextCaseInsensitive(publicationDetails, searchTerm)) {
            filteredPublications.push(publication);
        }
    }
    return filteredPublications;
}

export default function Publications() {
    const [publications, setPublications] = useState(createYearToPublicationMapping(publicationsJson));
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const filteredPublications = filterPublicationsOnSearchTerm(searchTerm);
        const yearToPublicationMapping = createYearToPublicationMapping(filteredPublications);
        setPublications(yearToPublicationMapping);
    }, [searchTerm]);

    return (
        <div className="page">
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm} 
                onChange={handleInputChange} 
            />
            {publications.map((yearToPublication, index) => (
                <div key={index}>
                    <h1>{yearToPublication.year}</h1>
                    {yearToPublication.publications.map((publicationEntry, pubIndex) => (
                        <PublicationCard
                            key={pubIndex}
                            publication={publicationEntry}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}