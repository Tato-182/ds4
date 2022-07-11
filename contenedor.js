const fs = require("fs");

module.exports = class Contenedor {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(this.nameFile, "utf-8");
    if(response === "") {
			return this.assign(true);
    } else {
      return JSON.parse(response);
    }
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: "No hay resultado para su búsqeuda.",
			};
		}
		return data.find(element => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		data.push(product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return {
			product: product,
		};
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: "El producto con el id especificado no ha sido encontrado.",
			};
		}
		product.id = id;
		const previousProduct = data.splice(id - 1, 1, product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return {
			previous: previousProduct,
			new: product,
		};
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: "El producto con el id especificado no ha sido encontrado.",
			};
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct,
			}
		}
	}

  assign(empty = false) {
		if(empty) {
			let id = 1;
			listaProductos.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(listaProductos));
			return listaProductos;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
		}
	}
}

const listaProductos = [
	{
		nombre: "Fender sunmustang",
		precio: 750,
		imagen: "https://1234-fender",
	},
	{
		nombre: "Ibanez GAX-75",
		precio: 350,
		imagen: "https://1234-ibanez",
	},
	{
		nombre: "Squier stratocaster",
		precio: 200,
		imagen: "https://1234-squier",
	},
	{
		nombre: "PRS custom 25",
		precio: 950,
		imagen: "https://1234-prs",
	},
	{
		nombre: "Epiphone dot studio",
		precio: 530,
		imagen: "https://1234-ephi",
	}
];
