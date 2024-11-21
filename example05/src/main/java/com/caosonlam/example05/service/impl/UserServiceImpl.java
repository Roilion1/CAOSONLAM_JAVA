package com.caosonlam.example05.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.caosonlam.example05.config.AppConstants;
import com.caosonlam.example05.entity.Address;
import com.caosonlam.example05.entity.Cart;
import com.caosonlam.example05.entity.Role;
import com.caosonlam.example05.entity.User;
import com.caosonlam.example05.exceptions.APIException;
import com.caosonlam.example05.exceptions.ResourceNotFoundException;
import com.caosonlam.example05.payloads.AddressDTO;
import com.caosonlam.example05.payloads.CartDTO;
import com.caosonlam.example05.payloads.ProductDTO;
import com.caosonlam.example05.payloads.UserDTO;
import com.caosonlam.example05.payloads.UserResponse;
import com.caosonlam.example05.repository.AddressRepo;
import com.caosonlam.example05.repository.RoleRepo;
import com.caosonlam.example05.repository.UserRepo;
import com.caosonlam.example05.service.CartService;
import com.caosonlam.example05.service.UserService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private CartService cartService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        try {
            // Map UserDTO to User entity
            User user = modelMapper.map(userDTO, User.class);

            // Create and associate Cart with User
            Cart cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);

            // Assign default role to the user
            Role role = roleRepo.findById(AppConstants.USER_ID)
                    .orElseThrow(() -> new APIException("Role not found"));
            user.getRoles().add(role);

            // Fetch or create Address
            String country = userDTO.getAddress().getCountry();
            String state = userDTO.getAddress().getState();
            String city = userDTO.getAddress().getCity();
            String pincode = userDTO.getAddress().getPincode();
            String street = userDTO.getAddress().getStreet();
            String buildingName = userDTO.getAddress().getBuildingName();
            Address address = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(
                    country, state, city, pincode, street, buildingName);

            if (address == null) {
                address = new Address(country, state, city, pincode, street, buildingName);
                address = addressRepo.save(address);
            }

            // Associate Address with User
            user.setAddresses(List.of(address));

            // Save User and update Cart
            User registeredUser = userRepo.save(user);
            cart.setUser(registeredUser);

            // Map back to UserDTO
            userDTO = modelMapper.map(registeredUser, UserDTO.class);
            userDTO.setAddress(modelMapper.map(address, AddressDTO.class));

            return userDTO;

        } catch (DataIntegrityViolationException e) {
            throw new APIException("User already exists with emailId: " + userDTO.getEmail());
        }
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        // Map Address
        if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
            userDTO.setAddress(modelMapper.map(user.getAddresses().get(0), AddressDTO.class));
        }

        // Map Cart and Cart Items
        if (user.getCart() != null) {
            CartDTO cartDTO = modelMapper.map(user.getCart(), CartDTO.class);

            List<ProductDTO> products = user.getCart().getCartItems().stream()
                    .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
                    .collect(Collectors.toList());

            cartDTO.setProducts(products);
            userDTO.setCart(cartDTO);
        }

        return userDTO;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        // Find user by ID
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Map User entity to UserDTO
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        // Map Address if present
        if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
            userDTO.setAddress(modelMapper.map(user.getAddresses().get(0), AddressDTO.class));
        }

        // Map Cart and Cart Items if present
        if (user.getCart() != null) {
            CartDTO cartDTO = modelMapper.map(user.getCart(), CartDTO.class);

            List<ProductDTO> products = user.getCart().getCartItems().stream()
                    .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
                    .collect(Collectors.toList());

            cartDTO.setProducts(products);
            userDTO.setCart(cartDTO);
        }

        return userDTO;
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        try {
            // Find user by ID
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

            // Update user information from UserDTO
            user.setEmail(userDTO.getEmail());
            user.setName(userDTO.getName());

            // Update password if provided
            if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }

            // Update other properties of User from UserDTO
            // e.g., user.setPhoneNumber(userDTO.getPhoneNumber());
            // e.g., user.setDateOfBirth(userDTO.getDateOfBirth());

            // Update address if provided
            if (userDTO.getAddress() != null) {
                Address address = modelMapper.map(userDTO.getAddress(), Address.class);
                // If needed, save or update the address in the repository
                // addressRepo.save(address);
                user.setAddresses(List.of(address));
            }

            // Update cart if provided
            if (userDTO.getCart() != null) {
                Cart cart = modelMapper.map(userDTO.getCart(), Cart.class);
                // If needed, update the cart in the repository or service
                // cartService.updateCart(cart);
                user.setCart(cart);
            }

            // Save the updated user
            User updatedUser = userRepo.save(user);

            // Map back to UserDTO
            UserDTO updatedUserDTO = modelMapper.map(updatedUser, UserDTO.class);

            // If address was updated, convert it to AddressDTO
            if (updatedUser.getAddresses() != null && !updatedUser.getAddresses().isEmpty()) {
                updatedUserDTO.setAddress(modelMapper.map(updatedUser.getAddresses().get(0), AddressDTO.class));
            }

            // If cart was updated, convert it to CartDTO
            if (updatedUser.getCart() != null) {
                CartDTO cartDTO = modelMapper.map(updatedUser.getCart(), CartDTO.class);

                List<ProductDTO> products = updatedUser.getCart().getCartItems().stream()
                        .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
                        .collect(Collectors.toList());

                cartDTO.setProducts(products);
                updatedUserDTO.setCart(cartDTO);
            }

            return updatedUserDTO;
        } catch (Exception e) {
            throw new APIException("Error updating user with id: " + userId, e);
        }
    }

    @Override
    public String deleteUser(Long userId) {
        try {
            // Check if user exists
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
            // Delete user
            userRepo.delete(user);
            return "User with id " + userId + " deleted successfully";

        } catch (Exception e) {
            throw new APIException("Error deleting user with id: " + userId, e);
        }
    }

    @Override
    public UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        try {
            // Create Pageable object for pagination and sorting
            Sort sort = Sort.by(sortOrder.equalsIgnoreCase("desc") ? Sort.Order.desc(sortBy) : Sort.Order.asc(sortBy));
            Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

            // Get paginated result
            Page<User> userPage = userRepo.findAll(pageable);

            // Convert page of users to DTOs
            List<UserDTO> userDTOs = userPage.getContent().stream()
                    .map(user -> {
                        UserDTO dto = modelMapper.map(user, UserDTO.class);
                        if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
                            dto.setAddress(modelMapper.map(user.getAddresses().get(0), AddressDTO.class));
                        }
                        if (user.getCart() != null) {
                            CartDTO cartDTO = modelMapper.map(user.getCart(), CartDTO.class);
                            List<ProductDTO> products = user.getCart().getCartItems().stream()
                                    .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
                                    .collect(Collectors.toList());
                            cartDTO.setProducts(products);
                            dto.setCart(cartDTO);
                        }
                        return dto;
                    })
                    .collect(Collectors.toList());

            // Return paginated user data
            return new UserResponse(userDTOs, userPage.getNumber(), userPage.getSize(), userPage.getTotalElements());

        } catch (Exception e) {
            throw new APIException("Error retrieving users", e);
        }
    }
}
