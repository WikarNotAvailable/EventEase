import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

class ApiService {
	private baseUrl = 'http://localhost:8000/api';

	private config: AxiosRequestConfig = {
		headers: {
			Authorization: null,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Access-Control-Allow-Headers':
				'Origin, X-Requested-With, Content-Type, Accept, Authorization',
		},
	};

	public async postUser(data: any) {
		const req = await axios.post(`${this.baseUrl}/users/`, data, this.config);
		return req.data;
	}

	public async login(data: any) {
		const req = await axios.post(
			`${this.baseUrl}/users/login/`,
			data,
			this.config
		);
		return req.data;
	}

	public async getEvents() {
		const req = await axios.get(`${this.baseUrl}/events`, this.config);
		return req;
	}

	public async getEventById(id: string) {
		const req = await axios.get(`${this.baseUrl}/events/${id}`, this.config);
		return req;
	}

	public async getEventTypes() {
		const req = await axios.get(`${this.baseUrl}/eventTypes`, this.config);
		return req;
	}

	public async getEventsByType(id: string) {
		const req = await axios.get(
			`${this.baseUrl}/events/type/${id}`,
			this.config
		);
		return req;
	}

	public async getTicketsForEvent(id: string, price: number) {
		const req = await axios.get(
			`${this.baseUrl}/tickets/forEvent?eventID=${id}&price=${price}`,
			this.config
		);
		return req;
	}

	public async postTransaction(userID: string, price: number) {
		const req = await axios.post(
			`${this.baseUrl}/transactions`,
			{
				userID: userID,
				transactionStatusID: 1,
				value: price,
				transactionDate: new Date(),
			},
			this.config
		);
		return req;
	}

	public async updateTicket(id: string, price: number, transactionID: number) {
		const req = await axios.put(
			`${this.baseUrl}/tickets/${id}`,
			{
				price: price,
				isAvailable: false,
				transactionID: transactionID,
			},
			this.config
		);
		return req;
	}

	public async getCompanyById(id: string) {
		const req = await axios.get(`${this.baseUrl}/companies/${id}`, this.config);
		return req;
	}

	public async getArtists() {
		const req = await axios.get(`${this.baseUrl}/performers`, this.config);
		return req;
	}

	public async getArtistByName(name: string) {
		const req = await axios.get(
			`${this.baseUrl}/performers/name/${name}`,
			this.config
		);
		return req.data;
	}

	public async getArtistsByType(type_id: number) {
		const req = await axios.get(
			`${this.baseUrl}/performers/type/${type_id}`,
			this.config
		);
		return req.data;
	}

	public async getArtistEvents(artist_id: number) {
		const req = await axios.get(
			`${this.baseUrl}/events/performer/${artist_id}`,
			this.config
		);
		return req.data;
	}

	public async getArtistTypes() {
		const req = await axios.get(`${this.baseUrl}/performerTypes`, this.config);
		return req;
	}

	public async getSpots() {
		const req = await axios.get(`${this.baseUrl}/spots`, this.config);
		return req.data;
	}

	public async getSpotByName(name: string) {
		const req = await axios.get(
			`${this.baseUrl}/spots/name/${name}`,
			this.config
		);
		return req.data;
	}

	public async getSpotsByType(type_id: number) {
		const req = await axios.get(
			`${this.baseUrl}/spots/type/${type_id}`,
			this.config
		);
		return req.data;
	}

	public async getSpotEvents(spot_id: number) {
		const req = await axios.get(
			`${this.baseUrl}/events/spot/${spot_id}`,
			this.config
		);
		return req.data;
	}

	public async getSpotTypes() {
		const req = await axios.get(`${this.baseUrl}/spotTypes`, this.config);
		return req.data;
	}

	public async createArtist(artist:any) {
		const req = await axios.post(
			`${this.baseUrl}/performers`,
			artist,
			this.config
		);
		return req;
	}

	public async updateArtist(artist:any, id:number) {
		const req = await axios.put(
			`${this.baseUrl}/performers/${id}`,
			artist,
			this.config
		);
		return req;
	}

	public async deleteArtist(id:number) {
		const req = await axios.delete(
			`${this.baseUrl}/performers/${id}`,this.config
		);
		return req;
	}
}

const api = new ApiService();

export default api;
