package com.player;

import com.player.dao.PlayerDAO;
import com.player.model.Player;

public class Main {
    public static void main(String[] args) {
        PlayerDAO playerDAO = new PlayerDAO();
        
        // Create a new player
        Player player = new Player(0, "Virat Kohli", "Batsman", 15, "India", 95.5);
        playerDAO.addPlayer(player);
        
        // Read all players
        System.out.println("All Players:");
        playerDAO.getAllPlayers().forEach(System.out::println);
        
        // Get players by country
        System.out.println("\nPlayers from India:");
        playerDAO.getPlayersByCountry("India").forEach(System.out::println);
        
        // Get players by experience (sorted)
        System.out.println("\nPlayers sorted by experience:");
        playerDAO.getPlayersByExperience().forEach(System.out::println);
    }
}
