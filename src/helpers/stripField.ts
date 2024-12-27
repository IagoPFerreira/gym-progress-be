/**
 * Remove campos indesejados de cada objeto em um array de elementos.
 *
 * @param {Array<any> | any} element - Um array de objetos, ou objeto que contém os campos a serem filtrados.
 * @param {string[]} unwantedFields - Uma lista de nomes de campos que devem ser removidos de cada objeto.
 * @returns {Array<any> | {}} Um novo array de objetos, ou um objeto com os campos indesejados removidos.
 */

export function stripFields(
	element: any[] | any,
	unwantedFields: string[]
): Array<any> | {} {
	const removeFields = (obj: any) => {
		const filteredData = obj.dataValues ? { ...obj.dataValues } : { ...obj };
		unwantedFields.forEach((field) => {
			delete filteredData[field];
		});
		return filteredData;
	};

	if (Array.isArray(element)) {
		return element.map(removeFields);
	} else {
		return removeFields(element);
	}
}
