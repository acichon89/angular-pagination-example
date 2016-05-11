package com.javangarda.spring.paginationexamples.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.javangarda.spring.paginationexamples.app.Vehicle;
import com.javangarda.spring.paginationexamples.app.VehicleService;

@Controller
@RequestMapping(value = "/")
public class IndexController {
	
	@Autowired
	private VehicleService vehicleService;

    @RequestMapping(value="/search", method = RequestMethod.GET)
    public String search(ModelMap map) {
        return "search";
    }
	 
    @ResponseBody
    @RequestMapping(value="find", method = RequestMethod.GET)
    public List<Vehicle> vehicles(@RequestParam("start") int start, @RequestParam("max") int max){
    	return vehicleService.find(start, max);
    }
    
    @ResponseBody
    @RequestMapping(value="count", method = RequestMethod.GET)
    public int countVehicles(){
    	return vehicleService.count();
    }
    
    
    @RequestMapping(value="/export", method = RequestMethod.GET)
    public String export(ModelMap map) {
        return "export";
    }

    
}
