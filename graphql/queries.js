import { gql } from '@apollo/client';

export const getAllPagesQuery = gql`
	query AllPagesQuery {
		articles {
			id
			slug
			content
			title
			shortDescription
			color {
				hex
				css
			}
			tags
			date
			categories {
				id
				name
				category_icon {
					url
				}
				categoryColor {
					css
				}
			}
			authors {
				id
			}
		}
	}
`;

export const getPageBySlugQuery = (slug) => {
	return gql`
	query getPagesBySlugQuery {
		article(where: {slug: "${slug}"}) {
			id
			slug
			content
			title
			color {
			  hex
			  css
			}
			tags
			date
			categories {
			  id
			  name
			  category_icon {
				url
			  }
			  categoryColor{
				css
			  }
			}
			authors {
			  id
			}
		  }
	  }
	  `;
};
