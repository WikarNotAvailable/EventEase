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

	public async getUserById(id: string) {
		const req = await axios.get(`${this.baseUrl}/users/${id}/`, this.config);
		return req;
	}

	public async updateUser(data: any, id: string) {
		const req = await axios.put(
			`${this.baseUrl}/users/${id}/`,
			data,
			this.config
		);
		return req;
	}

	public async getTransactionById(id: string) {
		const req = await axios.get(
			`${this.baseUrl}/transactions/${id}/`,
			this.config
		);
		return req;
	}

	public async getEvents() {
		const req = await axios.get(`${this.baseUrl}/events`, this.config);
		return req;
	}

	public async addEvent(data: any) {
		const req = await axios.post(`${this.baseUrl}/events`, data, this.config);
		return req;
	}

	public async addEventImage(data: any) {
		const req = await axios.post(
			`${this.baseUrl}/eventImages`,
			data,
			this.config
		);
		return req;
	}

	public async createDiscussion(data: any) {
		const req = await axios.post(
			`${this.baseUrl}/discussions`,
			data,
			this.config
		);
		return req;
	}

	public async addTickets(data: any, number: number) {
		const req = await axios.post(
			`${this.baseUrl}/tickets/${number}`,
			data,
			this.config
		);
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

	public async getEventsByCompany(id: string) {
		const req = await axios.get(
			`${this.baseUrl}/events/company/${id}`,
			this.config
		);
		return req;
	}

	public async asignArtistToEvent(data: any) {
		const req = await axios.post(
			`${this.baseUrl}/eventsPerformers`,
			data,
			this.config
		);
		return req;
	}

	public async getTicketsForEvent(id: string) {
		const req = await axios.get(
			`${this.baseUrl}/tickets/forEvent?eventID=${id}`,
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

	public async createCompany(data: any) {
		const req = await axios.post(
			`${this.baseUrl}/companies`,
			data,
			this.config
		);
		return req;
	}

	public async getDiscussionById(id: string) {
		const req = await axios.get(
			`${this.baseUrl}/discussions/${id}`,
			this.config
		);
		return req;
	}

	public async postCommentToDiscussion(
		discussionID: string,
		content: string,
		date: string,
		userID: string
	) {
		const req = await axios.post(
			`${this.baseUrl}/comments`,
			{
				content: content,
				post_date: date,
				user_id: userID,
				discussion_id: discussionID,
			},
			this.config
		);
		return req;
	}

	public async getCompanies() {
		const req = await axios.get(`${this.baseUrl}/companies`, this.config);
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
		return req;
	}

	public async getArtistsByType(type_id: number, limit?: number) {
		const req = await axios.get(
			`${this.baseUrl}/performers/type/${type_id}/${limit}`,
			this.config
		);
		return req;
	}

	public async getArtistEvents(artist_id: number) {
		const req = await axios.get(
			`${this.baseUrl}/events/performer/${artist_id}`,
			this.config
		);
		return req;
	}

	public async getArtistTypes() {
		const req = await axios.get(`${this.baseUrl}/performerTypes`, this.config);
		return req;
	}

	public async getSpots() {
		const req = await axios.get(`${this.baseUrl}/spots`, this.config);
		return req;
	}

	public async getSpotByName(name: string) {
		const req = await axios.get(
			`${this.baseUrl}/spots/name/${name}`,
			this.config
		);
		return req;
	}

	public async getSpotsByType(type_id: number) {
		const req = await axios.get(
			`${this.baseUrl}/spots/type/${type_id}`,
			this.config
		);
		return req;
	}

	public async getSpotEvents(spot_id: number) {
		const req = await axios.get(
			`${this.baseUrl}/events/spot/${spot_id}`,
			this.config
		);
		return req;
	}

	public async getSpotTypes() {
		const req = await axios.get(`${this.baseUrl}/spotTypes`, this.config);
		return req;
	}

	public async createArtist(artist: any) {
		const req = await axios.post(
			`${this.baseUrl}/performers`,
			artist,
			this.config
		);
		return req;
	}

	public async updateArtist(artist: any, id: number) {
		const req = await axios.put(
			`${this.baseUrl}/performers/${id}`,
			artist,
			this.config
		);
		return req;
	}

	public async deleteArtist(id: number) {
		const req = await axios.delete(
			`${this.baseUrl}/performers/${id}`,
			this.config
		);
		return req;
	}

	public async createArtistType(type: any) {
		const req = await axios.post(
			`${this.baseUrl}/performerTypes`,
			type,
			this.config
		);
		return req;
	}

	public async updateArtistType(type: any, id: number) {
		const req = await axios.put(
			`${this.baseUrl}/performerTypes/${id}`,
			type,
			this.config
		);
		return req;
	}

	public async deleteArtistType(id: number) {
		const req = await axios.delete(
			`${this.baseUrl}/performerTypes/${id}`,
			this.config
		);
		return req;
	}

	public async createSpotType(type: any) {
		const req = await axios.post(
			`${this.baseUrl}/spotTypes`,
			type,
			this.config
		);
		return req;
	}

	public async updateSpotType(type: any, id: number) {
		const req = await axios.put(
			`${this.baseUrl}/spotTypes/${id}`,
			type,
			this.config
		);
		return req;
	}

	public async deleteSpotType(id: number) {
		const req = await axios.delete(
			`${this.baseUrl}/spotTypes/${id}`,
			this.config
		);
		return req;
	}

	public async createSpot(spot: any) {
		const req = await axios.post(`${this.baseUrl}/spots`, spot, this.config);
		return req;
	}

	public async updateSpot(spot: any, id: number) {
		const req = await axios.put(
			`${this.baseUrl}/spots/${id}`,
			spot,
			this.config
		);
		return req;
	}

	public async deleteSpot(id: number) {
		const req = await axios.delete(`${this.baseUrl}/spots/${id}`, this.config);
		return req;
	}

	public async createAddress(address: any) {
		const req = await axios.post(
			`${this.baseUrl}/addresses`,
			address,
			this.config
		);
		return req;
	}

	public async updateAddress(address: any, id: number) {
		const req = await axios.put(
			`${this.baseUrl}/addresses/${id}`,
			address,
			this.config
		);
		return req;
	}

	public async deleteAddress(id: number) {
		const req = await axios.delete(
			`${this.baseUrl}/addresses/${id}`,
			this.config
		);
		return req;
	}
}

const api = new ApiService();

export default api;
