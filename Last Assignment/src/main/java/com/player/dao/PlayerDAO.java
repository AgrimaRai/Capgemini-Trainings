package com.player.dao;

import com.player.interfaces.PlayerOperations;
import com.player.model.Player;
import com.player.util.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PlayerDAO implements PlayerOperations {
    
    @Override
    public boolean addPlayer(Player player) {
        String sql = "INSERT INTO players (name, skill, exp, country, overall_score) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, player.getName());
            pstmt.setString(2, player.getSkill());
            pstmt.setInt(3, player.getExp());
            pstmt.setString(4, player.getCountry());
            pstmt.setDouble(5, player.getOverallScore());
            
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    @Override
    public List<Player> getAllPlayers() {
        List<Player> players = new ArrayList<>();
        String sql = "SELECT * FROM players";
        
        try (Connection conn = DatabaseUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                players.add(extractPlayerFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }
    
    @Override
    public Player getPlayerById(int id) {
        String sql = "SELECT * FROM players WHERE id = ?";
        
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                return extractPlayerFromResultSet(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    @Override
    public List<Player> getPlayersBySkill(String skill) {
        List<Player> players = new ArrayList<>();
        String sql = "SELECT * FROM players WHERE skill = ? ORDER BY overall_score DESC";
        
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, skill);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                players.add(extractPlayerFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }
    
    @Override
    public List<Player> getPlayersByCountry(String country) {
        List<Player> players = new ArrayList<>();
        String sql = "SELECT * FROM players WHERE country = ?";
        
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, country);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                players.add(extractPlayerFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }
    
    @Override
    public List<Player> getPlayersByExperience() {
        List<Player> players = new ArrayList<>();
        String sql = "SELECT * FROM players ORDER BY exp DESC";
        
        try (Connection conn = DatabaseUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                players.add(extractPlayerFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }
    
    @Override
    public boolean updatePlayer(Player player) {
        String sql = "UPDATE players SET name=?, skill=?, exp=?, country=?, overall_score=? WHERE id=?";
        
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, player.getName());
            pstmt.setString(2, player.getSkill());
            pstmt.setInt(3, player.getExp());
            pstmt.setString(4, player.getCountry());
            pstmt.setDouble(5, player.getOverallScore());
            pstmt.setInt(6, player.getId());
            
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    @Override
    public boolean deletePlayer(int id) {
        String sql = "DELETE FROM players WHERE id=?";
        
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    private Player extractPlayerFromResultSet(ResultSet rs) throws SQLException {
        return new Player(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("skill"),
            rs.getInt("exp"),
            rs.getString("country"),
            rs.getDouble("overall_score")
        );
    }
}
