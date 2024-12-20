package com.player.interfaces;

import com.player.model.Player;
import java.util.List;

public interface PlayerOperations {
    // Create
    boolean addPlayer(Player player);
    
    // Read
    List<Player> getAllPlayers();
    Player getPlayerById(int id);
    List<Player> getPlayersBySkill(String skill);
    List<Player> getPlayersByCountry(String country);
    List<Player> getPlayersByExperience();
    
    // Update
    boolean updatePlayer(Player player);
    
    // Delete
    boolean deletePlayer(int id);
}
