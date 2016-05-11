package com.javangarda.spring.paginationexamples.app;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;


@Service
public class VehicleService {

	private List<Vehicle> storedVehicles;
	
	@PostConstruct
	public void init(){
		this.storedVehicles=new ArrayList<Vehicle>();
		for(int i=0; i<1000;i++){
			Vehicle vehicle = new Vehicle();
			vehicle.setId(new Long(i+1));
			vehicle.setVin(UUID.randomUUID().toString());
			vehicle.setRegNo(UUID.randomUUID().toString());
			vehicle.setChassis(UUID.randomUUID().toString());
			storedVehicles.add(vehicle);
		}
	}
	
	public List<Vehicle> find(int startingAt, int maxResult) {
		if(startingAt>=storedVehicles.size()){
			return Collections.emptyList();
		}
		int toIndex = startingAt+maxResult;
		if(toIndex > storedVehicles.size()){
			toIndex=storedVehicles.size();
		}
		return storedVehicles.subList(startingAt, toIndex);
	}
	
	public int count(){
		return storedVehicles.size();
	}
}
