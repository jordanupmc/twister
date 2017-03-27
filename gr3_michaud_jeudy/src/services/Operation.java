package services;

public class Operation {
	
	public Operation(){
	
	}
	
	public static double addition(double a, double b){
		return a+b;
	}
	
	public static double multiplication(double a, double b){
		return a*b;
	}
	
	public static double division(double a, double b){
		return a/b;
	}
	
	public static double calcul(double a, double b, String s){
		if(s.toLowerCase().equals("addition"))
			return addition(a,b);
		else if(s.toLowerCase().equals("multiplication"))
			return multiplication(a,b);
		else if(s.toLowerCase().equals("division"))
			return division(a,b);
		
		return 0.0;
	}
}
